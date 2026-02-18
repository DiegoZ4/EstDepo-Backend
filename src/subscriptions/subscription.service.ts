import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigType } from '@nestjs/config';
import {
  MercadoPagoConfig,
  PreApproval,
  PreApprovalPlan,
  PaymentRefund,
  Payment,
} from 'mercadopago';

import config from '../config';
import { User, SubscriptionStatus } from '../est-depo/entities/user.entity';
import { UserRole } from '../est-depo/dtos/user.dto';
import { CreateSubscriptionDto, CreatePreapprovalPlanDto } from './dtos/subscription.dto';

@Injectable()
export class SubscriptionService {
  private mpClient: MercadoPagoConfig;
  private preApproval: PreApproval;
  private preApprovalPlan: PreApprovalPlan;
  private paymentRefund: PaymentRefund;
  private payment: Payment;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
  ) {
    if (this.configService.mercadoPago.accessToken) {
      this.mpClient = new MercadoPagoConfig({
        accessToken: this.configService.mercadoPago.accessToken,
      });
      this.preApproval = new PreApproval(this.mpClient);
      this.preApprovalPlan = new PreApprovalPlan(this.mpClient);
      this.paymentRefund = new PaymentRefund(this.mpClient);
      this.payment = new Payment(this.mpClient);
    }
  }

  /**
   * Crea el plan de suscripción en Mercado Pago (1.3)
   * Este endpoint se usa una sola vez para crear el plan inicial
   */
  async createPreapprovalPlan(planData?: CreatePreapprovalPlanDto) {
    if (!this.mpClient) {
      throw new HttpException(
        'Mercado Pago no está configurado',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    try {
      const response = await this.preApprovalPlan.create({
        body: {
          reason: planData?.reason || 'Suscripción EstDepo Premium',
          auto_recurring: {
            frequency: planData?.frequency || 1,
            frequency_type: planData?.frequency_type || 'months',
            transaction_amount: planData?.transaction_amount || 100,
            currency_id: planData?.currency_id || 'ARS',
          },
          back_url: 'https://estdepo.com/suscripcion/resultado',
        },
      });

      return {
        success: true,
        preapproval_plan_id: response.id,
        message: 'Plan creado exitosamente. Guarda el preapproval_plan_id en tus variables de entorno.',
        data: response,
      };
    } catch (error) {
      throw new HttpException(
        `Error al crear plan de suscripción: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Crea una suscripción para un usuario (1.4)
   * Implementación simplificada sin plan asociado (usuarios reales)
   */
  async createSubscription(userId: string, subscriptionData: CreateSubscriptionDto) {
    if (!this.mpClient) {
      throw new HttpException(
        'Mercado Pago no está configurado',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    try {
      // El email debe ser el de la cuenta de MP que va a pagar
      const payerEmail = subscriptionData.email;

      const isTestMode = this.configService.subscription.mode === 'test';
      const subscriptionAmount = this.configService.subscription.amount;
      const frequencyType = isTestMode ? 'days' : 'months';
      const frequency = 1;

      console.log('🔵 Creando suscripción sin plan asociado');
      console.log('📧 Email del pagador (cuenta MP):', payerEmail);
      console.log(`💲 Monto: $${subscriptionAmount} | Frecuencia: ${frequency} ${frequencyType} (modo: ${this.configService.subscription.mode})`);

      // Suscripción sin plan asociado con pago pendiente
      // Docs: https://www.mercadopago.com.ar/developers/es/docs/subscriptions/integration-configuration/subscription-no-associated-plan/pending-payments
      const subscription = await this.preApproval.create({
        body: {
          reason: 'Suscripción EstDepo Premium',
          external_reference: `user_${userId}`,
          payer_email: payerEmail,
          auto_recurring: {
            frequency,
            frequency_type: frequencyType,
            transaction_amount: subscriptionAmount,
            currency_id: 'ARS',
          },
          back_url: `${this.configService.frontendUrl}/suscripcion/resultado`,
          status: 'pending',
        },
      });

      console.log('✅ Suscripción creada:', subscription.id);
      console.log('🔗 init_point:', subscription.init_point);

      // Guardar el ID de suscripción y fechas iniciales en el usuario
      user.subscriptionId = subscription.id;
      
      // Setear fecha de inicio inmediatamente (se actualizará con webhook si cambia)
      const startDate = subscription.date_created 
        ? new Date(subscription.date_created) 
        : new Date();
      user.subscriptionStartDate = startDate;
      
      // Calcular fecha de fin (próximo pago) según modo
      const endDate = new Date(startDate);
      if (isTestMode) {
        endDate.setDate(endDate.getDate() + 1);
      } else {
        endDate.setMonth(endDate.getMonth() + 1);
      }
      user.subscriptionEndDate = endDate;
      
      console.log('📅 Fecha de inicio seteada:', user.subscriptionStartDate);
      console.log('📅 Fecha de próximo pago:', user.subscriptionEndDate);
      
      await this.userRepository.save(user);

      return {
        success: true,
        subscription_id: subscription.id,
        status: subscription.status,
        init_point: subscription.init_point,
        subscription_start_date: user.subscriptionStartDate,
        subscription_end_date: user.subscriptionEndDate,
        message: 'Redirigir al usuario a init_point para completar el pago',
      };
    } catch (error) {
      console.error('❌ Error creando suscripción:', error);
      throw new HttpException(
        `Error al crear suscripción: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Consulta el estado de la suscripción del usuario (1.5)
   * También sincroniza fechas con MP
   */
  async getSubscriptionStatus(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    // Si no tiene suscripción local, retornar estado none
    if (!user.subscriptionId) {
      return {
        status: SubscriptionStatus.NONE,
        subscription_id: null,
        subscription_start_date: null,
        subscription_end_date: null,
        is_premium: false,
      };
    }

    // Si tiene MP configurado, consultar el estado actual y fechas
    if (this.mpClient) {
      try {
        const subscription = await this.preApproval.get({
          id: user.subscriptionId,
        });

        console.log('🔄 Sincronizando con MP:', {
          status: subscription.status,
          date_created: subscription.date_created,
          next_payment_date: subscription.next_payment_date,
        });

        const mpStatus = this.mapMercadoPagoStatus(subscription.status);
        let updated = false;

        // Actualizar estado si cambió
        if (user.subscriptionStatus !== mpStatus) {
          user.subscriptionStatus = mpStatus;
          updated = true;
        }

        // Actualizar fechas desde MP
        if (subscription.date_created) {
          const mpStartDate = new Date(subscription.date_created);
          if (!user.subscriptionStartDate) {
            user.subscriptionStartDate = mpStartDate;
            updated = true;
            console.log('📅 Fecha de inicio sincronizada:', mpStartDate);
          }
        }

        if (subscription.next_payment_date) {
          const mpEndDate = new Date(subscription.next_payment_date);
          const currentEndDate = user.subscriptionEndDate ? new Date(user.subscriptionEndDate) : null;
          if (!currentEndDate || currentEndDate.getTime() !== mpEndDate.getTime()) {
            user.subscriptionEndDate = mpEndDate;
            updated = true;
            console.log('📅 Próximo pago sincronizado:', mpEndDate);
          }
        }

        // Actualizar rol según estado
        const shouldBePremium = mpStatus === SubscriptionStatus.ACTIVE;
        const isPremium = user.rol === UserRole.SUBS_USER;

        if (shouldBePremium && !isPremium) {
          user.rol = UserRole.SUBS_USER;
          updated = true;
          console.log('✅ Usuario promocionado a PREMIUM');
        } else if (!shouldBePremium && isPremium) {
          user.rol = UserRole.FREE_USER;
          updated = true;
          console.log('⬇️ Usuario bajado a FREE');
        }

        if (updated) {
          await this.userRepository.save(user);
          console.log('✅ Usuario sincronizado con MP');
        }
      } catch (error) {
        console.error('Error al consultar MP:', error.message);
        // Si falla la consulta, retornar el estado local
      }
    }

    return {
      status: user.subscriptionStatus,
      subscription_id: user.subscriptionId,
      subscription_start_date: user.subscriptionStartDate,
      subscription_end_date: user.subscriptionEndDate,
      pending_cancellation: user.pendingCancellation,
      is_premium: user.subscriptionStatus === SubscriptionStatus.ACTIVE,
    };
  }

  /**
   * Cancela o pausa la suscripción (1.6)
   * - Si pasaron menos de 10 días: cancela inmediatamente Y reembolsa
   * - Si pasaron más de 10 días: marca pendingCancellation (cancela al final del mes)
   */
  async cancelSubscription(userId: string, newStatus: 'cancelled' | 'paused') {
    if (!this.mpClient) {
      throw new HttpException(
        'Mercado Pago no está configurado',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    if (!user.subscriptionId) {
      throw new HttpException(
        'El usuario no tiene una suscripción activa',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      // Calcular días desde el inicio de la suscripción
      const daysSinceStart = user.subscriptionStartDate
        ? Math.floor(
            (Date.now() - new Date(user.subscriptionStartDate).getTime()) /
              (1000 * 60 * 60 * 24),
          )
        : 999; // Si no hay fecha, asumimos que pasaron muchos días

      console.log(`📅 Días desde inicio: ${daysSinceStart}`);

      if (newStatus === 'cancelled' && daysSinceStart < 10) {
        // CASO 1: Menos de 10 días → cancelar inmediatamente + reembolsar
        console.log('💰 Cancelación con reembolso (< 10 días)');

        // Cancelar suscripción en MP
        await this.preApproval.update({
          id: user.subscriptionId,
          body: { status: 'cancelled' },
        });

        // PROCESAR REEMBOLSO si hay un payment_id guardado
        let refundStatus = 'not_processed';
        let refundMessage = '';
        let paymentIdToRefund = user.lastPaymentId;

        // Si no hay payment_id guardado, intentar buscarlo en MP
        if (!paymentIdToRefund) {
          console.log('⚠️ No hay payment_id guardado, buscando en MP...');
          try {
            const subscription = await this.preApproval.get({
              id: user.subscriptionId,
            });
            
            // Buscar pagos asociados a la suscripción
            if (subscription.status === 'authorized' || subscription.status === 'cancelled') {
              // Intentar buscar pagos por subscription_id (esto puede variar según la API de MP)
              console.log('🔍 Suscripción encontrada, pero MP no expone los pagos directamente en PreApproval');
              console.log('💡 Recomendación: Esperar al webhook de subscription_authorized_payment para capturar el payment_id');
              refundMessage = 'No se pudo procesar el reembolso. El pago aún no ha sido registrado en el sistema. Intenta más tarde o contacta soporte.';
            }
          } catch (error) {
            console.error('❌ Error buscando pago en MP:', error);
          }
        }

        if (paymentIdToRefund) {
          try {
            console.log(
              '💳 Procesando reembolso del pago:',
              paymentIdToRefund,
            );

            const refund = await this.paymentRefund.create({
              payment_id: parseInt(paymentIdToRefund),
              body: {},
            });

            if (refund.status === 'approved') {
              refundStatus = 'approved';
              refundMessage = 'Reembolso procesado exitosamente';
              console.log('✅ Reembolso aprobado:', refund.id);
            } else {
              refundStatus = refund.status;
              refundMessage = `Reembolso en estado: ${refund.status}`;
              console.log('⚠️ Reembolso estado:', refund.status);
            }
          } catch (refundError) {
            console.error('❌ Error procesando reembolso:', refundError);
            refundStatus = 'error';
            refundMessage = `Error al procesar reembolso: ${refundError.message}`;
          }
        } else if (!refundMessage) {
          console.log('⚠️ No se pudo encontrar un payment_id para reembolsar');
          refundMessage = 'No se encontró un pago reciente para reembolsar. El webhook de pago aún no ha llegado.';
        }

        user.subscriptionStatus = SubscriptionStatus.CANCELLED;
        user.rol = UserRole.FREE_USER;
        user.pendingCancellation = false;
        await this.userRepository.save(user);

        return {
          success: true,
          status: 'cancelled',
          refund_status: refundStatus,
          message: `Suscripción cancelada. ${refundMessage}`,
          days_since_start: daysSinceStart,
        };
      } else if (newStatus === 'cancelled' && daysSinceStart >= 10) {
        // CASO 2: Más de 10 días → cancelar al final del mes
        console.log('📆 Cancelación programada para fin de mes');

        user.pendingCancellation = true;
        await this.userRepository.save(user);

        return {
          success: true,
          status: 'pending_cancellation',
          refunded: false,
          message: 'La suscripción se cancelará al final del periodo actual. Seguirás teniendo acceso hasta el ' + 
                   (user.subscriptionEndDate ? new Date(user.subscriptionEndDate).toLocaleDateString('es-AR') : 'fin del mes'),
          cancellation_date: user.subscriptionEndDate,
          days_since_start: daysSinceStart,
        };

      } else if (newStatus === 'paused') {
        // CASO 3: Pausar suscripción
        await this.preApproval.update({
          id: user.subscriptionId,
          body: { status: 'paused' },
        });

        user.subscriptionStatus = SubscriptionStatus.PAUSED;
        user.rol = UserRole.FREE_USER;
        await this.userRepository.save(user);

        return {
          success: true,
          status: 'paused',
          message: 'Suscripción pausada exitosamente',
        };
      }

    } catch (error) {
      throw new HttpException(
        `Error al ${newStatus === 'cancelled' ? 'cancelar' : 'pausar'} suscripción: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Revoca el premium de un usuario (solo para admins)
   * Cancela la suscripción en MP y cambia el rol a FREE_USER inmediatamente
   */
  async revokeUserPremium(userId: string, adminId: string) {
    if (!this.mpClient) {
      throw new HttpException(
        'Mercado Pago no está configurado',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    if (!user.subscriptionId) {
      throw new HttpException(
        'El usuario no tiene una suscripción activa',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      console.log(`🛑 Admin ${adminId} revocando premium de usuario ${userId}`);

      // Cancelar suscripción en Mercado Pago
      await this.preApproval.update({
        id: user.subscriptionId,
        body: { status: 'cancelled' },
      });

      // Actualizar estado del usuario inmediatamente
      user.subscriptionStatus = SubscriptionStatus.CANCELLED;
      user.rol = UserRole.FREE_USER;
      user.pendingCancellation = false;
      await this.userRepository.save(user);

      console.log(`✅ Premium revocado exitosamente para usuario ${user.email}`);

      return {
        success: true,
        message: `Premium revocado exitosamente para ${user.email}`,
        user: {
          id: user.id,
          email: user.email,
          rol: user.rol,
          subscriptionStatus: user.subscriptionStatus,
        },
      };
    } catch (error) {
      console.error('❌ Error revocando premium:', error);
      throw new HttpException(
        `Error al revocar premium: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Procesa webhooks de Mercado Pago (1.7)
   * Maneja notificaciones de cambios en suscripciones y pagos
   */
  async processWebhook(webhookData: any) {
    const { type, data, action } = webhookData;

    console.log('🔔 Webhook recibido:');
    console.log('   Type:', type);
    console.log('   Action:', action);
    console.log('   Data:', JSON.stringify(data, null, 2));

    // Procesamos tres tipos de eventos:
    // 1. subscription_preapproval: cambios en la suscripción (autorizar, cancelar, pausar)
    // 2. subscription_authorized_payment: pagos recurrentes (menos común)
    // 3. payment: pagos en general (action: payment.created, payment.updated)
    
    // CASO 1: Webhook de tipo "payment" (lo que MP envía para suscripciones)
    if (type === 'payment' && (action === 'payment.created' || action === 'payment.updated')) {
      const paymentId = data?.id;
      
      if (!paymentId) {
        console.error('❌ Payment ID no encontrado en webhook de pago');
        return { success: false, message: 'Payment ID no encontrado' };
      }
      
      console.log('💳 Webhook de pago recibido - Payment ID:', paymentId);
      
      try {
        // Obtener detalles del pago desde MP para sacar el preapproval_id
        const payment = await this.payment.get({ id: paymentId.toString() });
        
        console.log('📊 Detalles del pago obtenidos:');
        console.log('   Status:', payment.status);
        console.log('   External reference:', payment.external_reference);
        console.log('   Metadata:', JSON.stringify(payment.metadata));
        
        // El preapproval_id o user_id puede estar en external_reference
        const externalRef = payment.external_reference || payment.metadata?.preapproval_id;
        
        if (!externalRef) {
          console.error('⚠️ No se pudo obtener external_reference del pago');
          return { success: false, message: 'External reference no encontrado en el pago' };
        }
        
        console.log('🔗 External reference:', externalRef);
        
        // Detectar formato: si empieza con "user_", es un user_id, sino es preapproval_id
        let user;
        if (externalRef.startsWith('user_')) {
          const userId = externalRef.replace('user_', '');
          console.log('🔍 Buscando usuario por ID:', userId);
          user = await this.userRepository.findOne({ where: { id: userId } });
        } else {
          console.log('🔍 Buscando usuario por subscriptionId:', externalRef);
          user = await this.userRepository.findOne({ where: { subscriptionId: externalRef } });
        }
        
        if (!user) {
          console.error('❌ Usuario no encontrado para external_reference:', externalRef);
          return { success: false, message: 'Usuario no encontrado' };
        }
        
        console.log('✅ Usuario encontrado:', user.email);
        
        // Guardar el payment_id solo si el pago fue aprobado
        if (payment.status === 'approved' || payment.status === 'authorized') {
          user.lastPaymentId = paymentId.toString();
          await this.userRepository.save(user);
          console.log(
            '✅ Payment ID guardado:',
            paymentId,
            'para usuario:',
            user.email,
          );
        } else {
          console.log('⚠️ Pago no aprobado, status:', payment.status);
        }
        
        return { success: true, message: 'Payment ID procesado correctamente' };
      } catch (error) {
        console.error('❌ Error procesando webhook de pago:', error);
        return { success: false, message: `Error: ${error.message}` };
      }
    }
    
    // CASO 2: Capturar payment_id de pagos autorizados (formato alternativo)
    if (type === 'subscription_authorized_payment') {
      const paymentId = data?.id;
      const preapprovalId = data?.preapproval_id;
      
      console.log('💳 Pago autorizado recibido:');
      console.log('   Payment ID:', paymentId);
      console.log('   Preapproval ID:', preapprovalId);
      
      if (preapprovalId) {
        const user = await this.userRepository.findOne({
          where: { subscriptionId: preapprovalId },
        });
        
        if (user && paymentId) {
          user.lastPaymentId = paymentId.toString();
          await this.userRepository.save(user);
          console.log(
            '✅ Payment ID guardado:',
            paymentId,
            'para usuario:',
            user.email,
          );
        } else {
          console.log('⚠️ No se pudo guardar payment_id:');
          console.log('   Usuario encontrado:', !!user);
          console.log('   Payment ID presente:', !!paymentId);
        }
      } else {
        console.log('⚠️ No hay preapproval_id en el webhook de pago');
      }
      
      // Continuar con el procesamiento normal del webhook
    }
    
    // CASO 3: Validar si es un evento de suscripción
    if (type !== 'subscription_preapproval' && type !== 'subscription_authorized_payment') {
      console.log('⚠️ Evento no procesable (no es de suscripción):', type);
      return { success: true, message: 'Evento procesado - sin acción requerida' };
    }

    const subscriptionId = data?.id || data?.preapproval_id;
    if (!subscriptionId) {
      console.error('❌ ID de suscripción no encontrado en webhook');
      return { success: false, message: 'ID de suscripción no encontrado' };
    }

    // Buscar usuario con esa suscripción
    const user = await this.userRepository.findOne({
      where: { subscriptionId },
    });

    if (!user) {
      console.error('❌ Usuario no encontrado para suscripción:', subscriptionId);
      return { success: false, message: 'Usuario no encontrado para esta suscripción' };
    }

    console.log('👤 Usuario encontrado:', user.email, 'Rol actual:', user.rol);

    // Obtener detalles de la suscripción desde MP
    if (this.mpClient) {
      try {
        const subscription = await this.preApproval.get({ id: subscriptionId });
        
        console.log('📊 Detalles de MP:', {
          status: subscription.status,
          date_created: subscription.date_created,
          next_payment_date: subscription.next_payment_date,
          payer_id: subscription.payer_id,
        });

        const previousStatus = user.subscriptionStatus;
        const previousRole = user.rol;

        // Mapear estado de MP a estado local
        const newStatus = this.mapMercadoPagoStatus(subscription.status);
        user.subscriptionStatus = newStatus;
        
        // ACTUALIZAR FECHA DE INICIO con la fecha real de MP
        if (subscription.date_created) {
          const mpStartDate = new Date(subscription.date_created);
          const currentStartDate = user.subscriptionStartDate
            ? new Date(user.subscriptionStartDate)
            : null;
          if (
            !currentStartDate ||
            currentStartDate.getTime() !== mpStartDate.getTime()
          ) {
            user.subscriptionStartDate = mpStartDate;
            console.log(
              '📅 Fecha de inicio actualizada desde MP:',
              user.subscriptionStartDate,
            );
          }
        }
        
        // Cambiar rol según el estado
        if (newStatus === SubscriptionStatus.ACTIVE) {
          user.rol = UserRole.SUBS_USER;
          console.log('✅ Usuario cambiado a PREMIUM');
        } else {
          user.rol = UserRole.FREE_USER;
          console.log('🚫 Usuario cambiado a FREE');
        }

        // ACTUALIZAR fecha del próximo pago desde MP
        if (subscription.next_payment_date) {
          user.subscriptionEndDate = new Date(subscription.next_payment_date);
          console.log(
            '📅 Próximo pago actualizado desde MP:',
            user.subscriptionEndDate,
          );
        } else if (!user.subscriptionEndDate && user.subscriptionStartDate) {
          // Si MP no tiene next_payment_date, calcular según modo
          const isTestMode = this.configService.subscription.mode === 'test';
          const calculatedEndDate = new Date(user.subscriptionStartDate);
          if (isTestMode) {
            calculatedEndDate.setDate(calculatedEndDate.getDate() + 1);
          } else {
            calculatedEndDate.setMonth(calculatedEndDate.getMonth() + 1);
          }
          user.subscriptionEndDate = calculatedEndDate;
          console.log(
            `📅 Próximo pago calculado (${isTestMode ? '1 día' : '1 mes'}):`,
            user.subscriptionEndDate,
          );
        }

        // VERIFICAR SI HAY CANCELACIÓN PENDIENTE
        // Si llgó la fecha de fin y tiene pendingCancellation = true, cancelar en MP
        if (user.pendingCancellation && user.subscriptionEndDate) {
          const now = new Date();
          const endDate = new Date(user.subscriptionEndDate);
          
          if (now >= endDate) {
            console.log('🔚 Ejecutando cancelación pendiente');
            
            try {
              await this.preApproval.update({
                id: subscriptionId,
                body: { status: 'cancelled' },
              });
              
              user.subscriptionStatus = SubscriptionStatus.CANCELLED;
              user.rol =  UserRole.FREE_USER;
              user.pendingCancellation = false;
              
              console.log('✅ Suscripción cancelada automáticamente al final del periodo');
            } catch (cancelError) {
              console.error('❌ Error cancelando suscripción:', cancelError);
            }
          }
        }

        await this.userRepository.save(user);

        console.log('✅ Usuario actualizado:', {
          email: user.email,
          statusChange: `${previousStatus} → ${newStatus}`,
          roleChange: `${previousRole} → ${user.rol}`,
          subscriptionStartDate: user.subscriptionStartDate,
          subscriptionEndDate: user.subscriptionEndDate,
          pendingCancellation: user.pendingCancellation,
        });

        return {
          success: true,
          message: 'Estado de suscripción actualizado',
          previous_status: previousStatus,
          new_status: newStatus,
          previous_role: previousRole,
          new_role: user.rol,
        };
      } catch (error) {
        console.error('❌ Error procesando webhook:', error.message);
        console.error(error);
        return { success: false, message: error.message };
      }
    }

    console.error('❌ MP no configurado');
    return { success: false, message: 'MP no configurado' };
  }

  /**
   * Verifica si un usuario tiene suscripción premium activa (1.9)
   */
  async isPremiumUser(userId: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      return false;
    }
    return user.subscriptionStatus === SubscriptionStatus.ACTIVE;
  }

  /**
   * Mapea estados de MP a estados locales
   * Estados de MP: https://www.mercadopago.com.ar/developers/es/docs/subscriptions/subscription-management
   */
  private mapMercadoPagoStatus(mpStatus: string): SubscriptionStatus {
    const statusMap: Record<string, SubscriptionStatus> = {
      authorized: SubscriptionStatus.ACTIVE,  // Usuario pagó, suscripción activa
      paused: SubscriptionStatus.PAUSED,       // Suscripción pausada temporalmente
      cancelled: SubscriptionStatus.CANCELLED, // Suscripción cancelada
      pending: SubscriptionStatus.NONE,        // Aún no pagó (no debe ser activa)
    };
    return statusMap[mpStatus] || SubscriptionStatus.NONE;
  }
}
