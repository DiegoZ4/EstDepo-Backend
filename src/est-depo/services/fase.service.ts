import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { Fase } from '../entities/fase.entity';
import { Torneo } from '../entities/torneo.entity';
import { Category } from '../entities/category.entity';
import { CreateFaseDto, UpdateFaseDto } from '../dtos/fase.dto';

@Injectable()
export class FaseService {
  constructor(
    @InjectRepository(Fase) private faseRepo: Repository<Fase>,
    @InjectRepository(Torneo) private torneoRepo: Repository<Torneo>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  async findByTorneo(torneoId: number, categoriaId?: number): Promise<Fase[]> {
    const where: any = { torneoId };
    if (categoriaId !== undefined) where.categoriaId = categoriaId;
    return this.faseRepo.find({ where, order: { orden: 'ASC', id: 'ASC' } });
  }

  async findOne(id: number): Promise<Fase> {
    const fase = await this.faseRepo.findOne({
      where: { id },
      relations: ['torneo', 'category'],
    });
    if (!fase) throw new NotFoundException(`Fase #${id} no encontrada`);
    return fase;
  }

  async create(dto: CreateFaseDto): Promise<Fase> {
    const torneo = await this.torneoRepo.findOne({ where: { id: dto.torneoId } });
    if (!torneo) throw new NotFoundException(`Torneo #${dto.torneoId} no encontrado`);

    if (dto.categoriaId !== undefined && dto.categoriaId !== null) {
      const cat = await this.categoryRepo.findOne({ where: { id: dto.categoriaId } });
      if (!cat) throw new NotFoundException(`Categoría #${dto.categoriaId} no encontrada`);
    }

    const fase = this.faseRepo.create({
      torneoId: dto.torneoId,
      categoriaId: dto.categoriaId ?? null,
      nombre: dto.nombre,
      tipo: dto.tipo,
      orden: dto.orden ?? 0,
      idaVuelta: dto.idaVuelta ?? false,
      cantidadLlaves: dto.cantidadLlaves ?? null,
    });
    return this.faseRepo.save(fase);
  }

  async update(id: number, changes: UpdateFaseDto): Promise<Fase> {
    const fase = await this.faseRepo.findOne({ where: { id } });
    if (!fase) throw new NotFoundException(`Fase #${id} no encontrada`);
    this.faseRepo.merge(fase, changes as any);
    return this.faseRepo.save(fase);
  }

  async remove(id: number) {
    const fase = await this.faseRepo.findOne({ where: { id } });
    if (!fase) throw new NotFoundException(`Fase #${id} no encontrada`);
    return this.faseRepo.delete(id);
  }

  /**
   * Crea la escalera estándar de fases de eliminatoria para `cantidadEquipos`
   * clasificados (se redondea hacia arriba a la potencia de 2 más cercana).
   * Devuelve las fases creadas, ordenadas de la primera ronda a la final.
   * Si ya existen fases de eliminatoria para ese torneo/categoría, las devuelve.
   */
  async ensureFasesEliminatoria(
    torneoId: number,
    categoriaId: number | null,
    cantidadEquipos: number,
    opts: { idaVuelta?: boolean; tercerPuesto?: boolean } = {},
  ): Promise<Fase[]> {
    const existentes = await this.faseRepo.find({
      where: {
        torneoId,
        categoriaId: categoriaId ?? (IsNull() as any),
        tipo: 'eliminatoria',
      },
      order: { orden: 'ASC' },
    });
    if (existentes.length > 0) return existentes;

    let slots = 2;
    while (slots < cantidadEquipos) slots *= 2;
    if (slots < 2) throw new BadRequestException('Se necesitan al menos 2 equipos');

    // slots = 16 -> [8,4,2,1] llaves ; nombres estándar
    const rondas: { llaves: number; nombre: string }[] = [];
    for (let n = slots / 2; n >= 1; n /= 2) {
      rondas.push({ llaves: n, nombre: this.nombreRonda(n) });
    }

    const baseOrden = 1; // 0 = grupos
    const creadas: Fase[] = [];
    for (let i = 0; i < rondas.length; i++) {
      const r = rondas[i];
      const fase = this.faseRepo.create({
        torneoId,
        categoriaId: categoriaId ?? null,
        nombre: r.nombre,
        tipo: 'eliminatoria',
        orden: baseOrden + i,
        // típico: la final a un solo partido
        idaVuelta: r.llaves === 1 ? false : (opts.idaVuelta ?? false),
        cantidadLlaves: r.llaves,
      });
      creadas.push(await this.faseRepo.save(fase));
    }

    if (opts.tercerPuesto) {
      const tp = this.faseRepo.create({
        torneoId,
        categoriaId: categoriaId ?? null,
        nombre: 'Tercer puesto',
        tipo: 'eliminatoria',
        orden: baseOrden + rondas.length,
        idaVuelta: false,
        cantidadLlaves: 1,
      });
      creadas.push(await this.faseRepo.save(tp));
    }

    return creadas;
  }

  private nombreRonda(llaves: number): string {
    switch (llaves) {
      case 1: return 'Final';
      case 2: return 'Semifinal';
      case 4: return 'Cuartos de final';
      case 8: return 'Octavos de final';
      case 16: return 'Dieciseisavos de final';
      default: return `Ronda de ${llaves * 2}`;
    }
  }
}
