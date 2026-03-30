import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EquipoLibre } from '../entities/equipo-libre.entity';
import { CreateEquipoLibreDto } from '../dtos/equipo-libre.dto';

@Injectable()
export class EquipoLibreService {
  constructor(
    @InjectRepository(EquipoLibre)
    private readonly equipoLibreRepo: Repository<EquipoLibre>,
  ) { }

  // Obtener equipos libres por torneo, categoría y fecha
  async getLibres(torneoId: number, categoriaId: number, fecha: number): Promise<EquipoLibre[]> {
    return this.equipoLibreRepo.find({
      where: {
        torneo: { id: torneoId },
        category: { id: categoriaId },
        fecha,
      },
      relations: ['equipo'],
    });
  }

  // Obtener todos los equipos libres de un torneo y categoría (todas las fechas)
  async getLibresByTorneoYCategoria(torneoId: number, categoriaId: number): Promise<EquipoLibre[]> {
    return this.equipoLibreRepo.find({
      where: {
        torneo: { id: torneoId },
        category: { id: categoriaId },
      },
      relations: ['equipo'],
      order: { fecha: 'ASC' },
    });
  }

  // Crear un equipo libre
  async create(dto: CreateEquipoLibreDto): Promise<EquipoLibre> {
    // Verificar que no exista ya
    const existing = await this.equipoLibreRepo.findOne({
      where: {
        torneo: { id: dto.torneoId },
        category: { id: dto.categoriaId },
        fecha: dto.fecha,
        equipo: { id: dto.equipoId },
      },
    });

    if (existing) {
      throw new ConflictException(
        `El equipo ${dto.equipoId} ya está libre en la fecha ${dto.fecha}`,
      );
    }

    const equipoLibre = this.equipoLibreRepo.create({
      equipo: { id: dto.equipoId } as any,
      torneo: { id: dto.torneoId } as any,
      category: { id: dto.categoriaId } as any,
      fecha: dto.fecha,
    });

    return this.equipoLibreRepo.save(equipoLibre);
  }

  // Eliminar un equipo libre por ID
  async remove(id: number): Promise<void> {
    const result = await this.equipoLibreRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Equipo libre con id ${id} no encontrado`);
    }
  }

  // Eliminar equipo libre por datos específicos (útil para el frontend)
  async removeByData(torneoId: number, categoriaId: number, fecha: number, equipoId: number): Promise<void> {
    const result = await this.equipoLibreRepo.delete({
      torneo: { id: torneoId } as any,
      category: { id: categoriaId } as any,
      fecha,
      equipo: { id: equipoId } as any,
    });

    if (result.affected === 0) {
      throw new NotFoundException('Equipo libre no encontrado');
    }
  }
}
