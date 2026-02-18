import { IsEmail, IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SubscriptionStatus } from '../../est-depo/entities/user.entity';

export class CreateSubscriptionDto {
  @ApiProperty({ description: 'Email de la cuenta de Mercado Pago que va a pagar. Debe coincidir con el email de MP del pagador.' })
  @IsNotEmpty({ message: 'El email de Mercado Pago es obligatorio' })
  @IsEmail({}, { message: 'Debe ser un email válido' })
  readonly email: string;
}

export class CreatePreapprovalPlanDto {
  @ApiPropertyOptional({ description: 'Razón del plan de suscripción' })
  @IsOptional()
  @IsString()
  readonly reason?: string;

  @ApiPropertyOptional({ description: 'Frecuencia de cobro (default: 1)' })
  @IsOptional()
  readonly frequency?: number;

  @ApiPropertyOptional({ description: 'Tipo de frecuencia (default: months)' })
  @IsOptional()
  @IsString()
  readonly frequency_type?: string;

  @ApiPropertyOptional({ description: 'Monto de la transacción (default: 2000)' })
  @IsOptional()
  readonly transaction_amount?: number;

  @ApiPropertyOptional({ description: 'Código de moneda (default: ARS)' })
  @IsOptional()
  @IsString()
  readonly currency_id?: string;
}

export class CancelSubscriptionDto {
  @ApiProperty({ description: 'Nuevo estado: cancelled o paused' })
  @IsNotEmpty()
  @IsEnum(['cancelled', 'paused'], { message: 'El estado debe ser cancelled o paused' })
  readonly status: 'cancelled' | 'paused';
}

export class SubscriptionResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  status: SubscriptionStatus;

  @ApiPropertyOptional()
  subscription_id?: string;

  @ApiPropertyOptional()
  subscription_end_date?: Date;
}

export class MercadoPagoWebhookDto {
  @ApiPropertyOptional({ description: 'ID del recurso' })
  @IsOptional()
  id?: string | number;

  @ApiPropertyOptional({ description: 'Indica si es en vivo' })
  @IsOptional()
  live_mode?: boolean;

  @ApiProperty({ description: 'Tipo de evento' })
  @IsString()
  type: string;

  @ApiPropertyOptional({ description: 'Fecha de creación' })
  @IsOptional()
  @IsString()
  date_created?: string;

  @ApiPropertyOptional({ description: 'ID de la aplicación' })
  @IsOptional()
  application_id?: string;

  @ApiPropertyOptional({ description: 'ID del usuario' })
  @IsOptional()
  user_id?: string;

  @ApiPropertyOptional({ description: 'Versión del API' })
  @IsOptional()
  @IsString()
  api_version?: string;

  @ApiPropertyOptional({ description: 'Acción realizada' })
  @IsOptional()
  @IsString()
  action?: string;

  @ApiPropertyOptional({ description: 'Datos del evento' })
  @IsOptional()
  data?: {
    id?: string;
    preapproval_id?: string;
  };
}
