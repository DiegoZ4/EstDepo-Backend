import { Injectable, Inject, NotFoundException } from '@nestjs/common';

import { ConfigService, ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import { In } from 'typeorm';

import { Pais } from '../entities/pais.entity';
import { Equipo } from '../entities/equipo.entity';
import { Torneo } from '../entities/torneo.entity';
import { Category } from '../entities/category.entity';
import { Gol } from '../entities/goles.entity';
import { Jugador } from '../entities/jugador.entity';
import { CreateJugadorDto, UpdateJugadorDto } from '../dtos/jugador.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JugadorService {

  constructor(
    private configService: ConfigService,
    @InjectRepository(Pais) private paisRepo: Repository<Pais>,
    @InjectRepository(Equipo) private equipoRepo: Repository<Equipo>,

    @Inject('PG') private clientPg: Client,
    @InjectRepository(Gol) private golesRepo: Repository<Gol>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Jugador) private jugadorRepo: Repository<Jugador>

  ) { }

  findAll() {
    const apiKey = this.configService.get('API_KEY');
    const dbName = this.configService.get('DATABASE_NAME');
    console.log(apiKey, dbName,);

    return this.jugadorRepo.find();
  }

  async getRankingGoleadores() {
    const ranking = await this.jugadorRepo
      .createQueryBuilder('jugador')
      .leftJoin('jugador.equipo', 'equipo')
      .leftJoin('jugador.category', 'category')
      .leftJoin('jugador.gol', 'gol') // Ahora coincide con la relación 'goles'
      .leftJoin('gol.torneo', 'torneo')
      .select([
        'equipo.id AS equipoId',
        'equipo.name AS equipoName',
        'jugador.id AS jugadorId',
        'jugador.name AS jugadorName',
        'torneo.id AS torneoId',
        'torneo.name AS torneoName',
        'category.id AS categoriaId',
        'category.name AS categoriaName',
        'COALESCE(COUNT(gol.id), 0) AS totalGoles',
      ])
      .groupBy('jugador.id, jugador.name, equipo.id, equipo.name, torneo.id, torneo.name, category.id, category.name')
      .orderBy('totalGoles', 'DESC')
      .getRawMany();

    return ranking;
  }


  async findOne(id: number) {
    const jugador = await this.jugadorRepo.findOne({ id });
    if (jugador) {
      return jugador;
    } else {
      throw new NotFoundException(`jugador #${id} not found`);
    }

  }

  async findByEquipo(equipoId: number): Promise<Jugador[]> {
    const result = await this.jugadorRepo.find({
      where: { equipo: { id: equipoId } },
      relations: ['equipo'],
    });
    return result;
  }


  async create(data: CreateJugadorDto) {
    const pais = await this.paisRepo.findOne({ where: { id: data.paisId } });
    if (!pais) {
      throw new Error('País no encontrado');
    }
    const equipo = await this.equipoRepo.findOne({ where: { id: data.equipoId } });
    if (!equipo) {
      throw new Error('Equipo no encontrado');
    }
    const newJugador = this.jugadorRepo.create({
      ...data,
      pais,
      equipo
    });
    return this.jugadorRepo.save(newJugador);

  }
  async update(id: number, updateJugadorDto: UpdateJugadorDto): Promise<Jugador> {
    const jugador = await this.jugadorRepo.findOne({ where: { id } });

    if (!jugador) {
      throw new NotFoundException('Jugador not found');
    }

    // Convertir IDs a entidades
    if (updateJugadorDto.paisId) {
      jugador.pais = await this.paisRepo.findOne({
        where: { id: updateJugadorDto.paisId },
      });
    }

    if (updateJugadorDto.equipoId) {
      jugador.equipo = await this.equipoRepo.findOne({
        where: { id: updateJugadorDto.equipoId },
      });
    }

    if (updateJugadorDto.categoriesId) {
      jugador.category = await this.categoryRepo.findOne({
        where: { id: updateJugadorDto.categoriesId },
      });
    }

    // Actualizar valores
    Object.assign(jugador, updateJugadorDto);

    return this.jugadorRepo.save(jugador);
  }


  remove(id: number) {
    return this.jugadorRepo.delete(id);
  }
}
