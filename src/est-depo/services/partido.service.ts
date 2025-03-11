import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';
import { BadRequestException } from '@nestjs/common';

import { Partido } from '../entities/partido.entity';
import { CreatePartidoDto, UpdatePartidoDto } from '../dtos/partido.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipo } from '../entities/equipo.entity';
import { Torneo } from '../entities/torneo.entity';
import { Jugador } from '../entities/jugador.entity';
import { Category } from '../entities/category.entity';
import { Gol } from '../entities/goles.entity';

@Injectable()
export class PartidoService {
  constructor(
    private configService: ConfigService,
    @Inject('PG') private clientPg: Client,
    @InjectRepository(Partido) private partidoRepo: Repository<Partido>,
    @InjectRepository(Equipo) private equipoRepo: Repository<Equipo>,
    @InjectRepository(Torneo) private torneoRepo: Repository<Torneo>,
    @InjectRepository(Jugador) private jugadorRepo: Repository<Jugador>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Gol) private golRepo: Repository<Gol>
  ) { }

  async findAll() {
    return this.partidoRepo.find({
      relations: [
        'goles',
        'equipoVisitante',
        'equipoLocal',
        'torneo',
        'category'
      ],
    });
  }



  async findOne(id: number) {
    const partido = await this.partidoRepo.findOne({
      where: { id },
      relations: ['equipoLocal', 'equipoVisitante', 'torneo', 'category', 'goles'], // Incluye la relación con "pais"
    });

    if (!partido) {
      throw new NotFoundException(`Partido #${id} no encontrado`);
    }

    return partido;
  }

  async create(createPartidoDto: CreatePartidoDto): Promise<Partido> {
    const { fecha, date, equipoLocalId, equipoVisitanteId, torneoId, categoriaId, estado } = createPartidoDto;

    // Validar equipo local
    const equipoLocal = await this.equipoRepo.findOne({ where: { id: equipoLocalId } });
    if (!equipoLocal) {
      throw new NotFoundException(`Equipo local con ID ${equipoLocalId} no encontrado`);
    }

    // Validar equipo visitante
    const equipoVisitante = await this.equipoRepo.findOne({ where: { id: equipoVisitanteId } });
    if (!equipoVisitante) {
      throw new NotFoundException(`Equipo visitante con ID ${equipoVisitanteId} no encontrado`);
    }

    // Validar torneo
    const torneo = await this.torneoRepo.findOne({ where: { id: torneoId } });
    if (!torneo) {
      throw new NotFoundException(`Torneo con ID ${torneoId} no encontrado`);
    }

    // Validar categoría
    const category = await this.categoryRepo.findOne({ where: { id: categoriaId } });
    if (!category) {
      throw new NotFoundException(`Categoría con ID ${categoriaId} no encontrada`);
    }

    // Crear el partido
    const partido = this.partidoRepo.create({
      fecha,
      date,
      equipoLocal,
      equipoVisitante,
      torneo,
      category,
      estado,
    });

    // Guardar en la base de datos
    return await this.partidoRepo.save(partido);
  }

  async getFixtureByCategory(torneoId: number, categoriaId: number, fecha: number): Promise<Partido[]> {
    // Buscar el torneo y sus categorías
    const torneo = await this.torneoRepo.findOne({
      where: { id: torneoId },
      relations: ['categories'],
    });
    if (!torneo) {
      throw new NotFoundException(`Torneo #${torneoId} no encontrado`);
    }
    // Verificar que la categoría esté asociada al torneo
    const category = torneo.categories.find((cat) => cat.id === categoriaId);
    if (!category) {
      throw new NotFoundException(
        `Categoría #${categoriaId} no encontrada en el torneo #${torneoId}`
      );
    }

    // Buscar partidos filtrando por torneo, categoría y la fecha (jornada)
    const partidos = await this.partidoRepo.find({
      where: {
        torneo: { id: torneoId },
        category: { id: categoriaId },
        fecha: fecha, // Asumimos que en la entidad Partido el campo "fecha" guarda el número de jornada
      },
      relations: ['equipoLocal', 'equipoVisitante', 'category', 'torneo'],
    });

    return partidos;
  }


  async update(id: number, updatePartidoDto: UpdatePartidoDto): Promise<Partido> {
    const partido = await this.partidoRepo.findOne({ where: { id } });

    if (!partido) {
      throw new NotFoundException('Partido not found');
    }

    // Convertir IDs a entidades
    if (updatePartidoDto.equipoLocalId) {
      partido.equipoLocal = await this.equipoRepo.findOne({
        where: { id: updatePartidoDto.equipoLocalId },
      });
    }

    if (updatePartidoDto.equipoVisitanteId) {
      partido.equipoVisitante = await this.equipoRepo.findOne({
        where: { id: updatePartidoDto.equipoVisitanteId },
      });
    }

    if (updatePartidoDto.torneoId) {
      partido.torneo = await this.torneoRepo.findOne({
        where: { id: updatePartidoDto.torneoId },
      });
    }

    if (updatePartidoDto.categoriaId) {
      partido.category = await this.categoryRepo.findOne({
        where: { id: updatePartidoDto.categoriaId },
      });
    }

    // Actualizar valores
    Object.assign(partido, updatePartidoDto);

    return this.partidoRepo.save(partido);
  }




  remove(id: number) {
    return this.partidoRepo.delete(id);
  }

  // Función para validar equipos
  private async validateEquipos(equipoLocalId: number, equipoVisitanteId: number) {
    const equipoLocal = await this.equipoRepo.findOne({ where: { id: equipoLocalId } });
    const equipoVisitante = await this.equipoRepo.findOne({ where: { id: equipoVisitanteId } });

    if (!equipoLocal || !equipoVisitante) {
      throw new NotFoundException('One of the teams was not found');
    }

    return { equipoLocal, equipoVisitante };
  }
}
