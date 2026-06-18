import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Pronostico } from '../entities/pronostico.entity';
import { Partido } from '../entities/partido.entity';
import { CreatePronosticoDto } from '../dtos/pronostico.dto';

@Injectable()
export class PronosticoService {
  constructor(
    @InjectRepository(Pronostico) private pronosticoRepo: Repository<Pronostico>,
    @InjectRepository(Partido) private partidoRepo: Repository<Partido>,
  ) {}

  // Crea o actualiza el pronóstico del usuario para un partido (un voto por usuario+partido)
  async upsert(userId: string, dto: CreatePronosticoDto): Promise<Pronostico> {
    const { partidoId, equipoElegidoId } = dto;

    const partido = await this.partidoRepo.findOne({
      where: { id: partidoId },
      relations: ['equipoLocal', 'equipoVisitante'],
    });
    if (!partido) {
      throw new NotFoundException(`Partido #${partidoId} no encontrado`);
    }

    // El equipo elegido tiene que ser uno de los dos del partido
    const esLocal = partido.equipoLocal?.id === equipoElegidoId;
    const esVisitante = partido.equipoVisitante?.id === equipoElegidoId;
    if (!esLocal && !esVisitante) {
      throw new BadRequestException(
        'El equipo elegido debe ser el local o el visitante de este partido',
      );
    }

    // No se puede pronosticar (ni cambiar) una vez que el partido empezó
    if (partido.date && new Date(partido.date).getTime() <= Date.now()) {
      throw new BadRequestException(
        'El partido ya comenzó, no se puede pronosticar ni modificar el pronóstico',
      );
    }

    // ¿Ya tenía un pronóstico para este partido?
    let pronostico = await this.pronosticoRepo.findOne({
      where: { user: { id: userId }, partido: { id: partidoId } },
    });

    if (pronostico) {
      pronostico.equipoElegido = { id: equipoElegidoId } as any;
    } else {
      pronostico = this.pronosticoRepo.create({
        user: { id: userId } as any,
        partido: { id: partidoId } as any,
        equipoElegido: { id: equipoElegidoId } as any,
      });
    }

    return this.pronosticoRepo.save(pronostico);
  }

  // Pronósticos del usuario logueado
  async findMine(userId: string): Promise<Pronostico[]> {
    return this.pronosticoRepo.find({
      where: { user: { id: userId } },
      relations: ['partido', 'partido.equipoLocal', 'partido.equipoVisitante', 'equipoElegido'],
      order: { createdAt: 'DESC' },
    });
  }

  // Pronóstico del usuario logueado para un partido puntual (o null si no votó)
  async findMineForPartido(userId: string, partidoId: number): Promise<Pronostico | null> {
    return this.pronosticoRepo.findOne({
      where: { user: { id: userId }, partido: { id: partidoId } },
      relations: ['equipoElegido'],
    });
  }

  // Resumen de votos de un partido: cuántos votos por equipo, porcentaje y favorito
  async getResumen(partidoId: number) {
    const partido = await this.partidoRepo.findOne({
      where: { id: partidoId },
      relations: ['equipoLocal', 'equipoVisitante'],
    });
    if (!partido) {
      throw new NotFoundException(`Partido #${partidoId} no encontrado`);
    }

    const conteos = await this.pronosticoRepo
      .createQueryBuilder('p')
      .select('p.equipo_elegido_id', 'equipoId')
      .addSelect('COUNT(*)', 'votos')
      .where('p.partido_id = :partidoId', { partidoId })
      .groupBy('p.equipo_elegido_id')
      .getRawMany<{ equipoId: number; votos: string }>();

    const votosPorEquipo = new Map<number, number>();
    let total = 0;
    for (const row of conteos) {
      const votos = Number(row.votos);
      votosPorEquipo.set(Number(row.equipoId), votos);
      total += votos;
    }

    const armarEquipo = (equipo: { id: number; name: string } | null) => {
      if (!equipo) return null;
      const votos = votosPorEquipo.get(equipo.id) ?? 0;
      return {
        equipoId: equipo.id,
        nombre: equipo.name,
        votos,
        porcentaje: total > 0 ? Math.round((votos / total) * 100) : 0,
      };
    };

    const local = armarEquipo(partido.equipoLocal);
    const visitante = armarEquipo(partido.equipoVisitante);

    // Favorito = el que más votos tiene (null si están empatados o no hay votos)
    let favoritoId: number | null = null;
    if (local && visitante && total > 0 && local.votos !== visitante.votos) {
      favoritoId = local.votos > visitante.votos ? local.equipoId : visitante.equipoId;
    }

    return {
      partidoId,
      totalVotos: total,
      favoritoId,
      local,
      visitante,
    };
  }

  async remove(userId: string, partidoId: number): Promise<void> {
    const pronostico = await this.pronosticoRepo.findOne({
      where: { user: { id: userId }, partido: { id: partidoId } },
    });
    if (!pronostico) {
      throw new NotFoundException('No tenés un pronóstico para este partido');
    }
    await this.pronosticoRepo.remove(pronostico);
  }
}
