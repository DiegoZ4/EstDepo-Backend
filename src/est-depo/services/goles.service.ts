import { Injectable, Inject, NotFoundException } from '@nestjs/common';

import { ConfigService, ConfigType } from '@nestjs/config';
import { Client } from 'pg';

import { Gol } from '../entities/goles.entity';
import { CreateGolDto, UpdateGolDto } from '../dtos/goles.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipo } from '../entities/equipo.entity';
import { Torneo } from '../entities/torneo.entity';
import { Jugador } from '../entities/jugador.entity';
import { Partido } from '../entities/partido.entity';


@Injectable()
export class GolesService {

  constructor(
    private configService: ConfigService,
    @Inject('PG') private clientPg: Client,
    @InjectRepository(Gol) private GolesRepo: Repository<Gol>,
    @InjectRepository(Partido) private partidoRepo: Repository<Partido>,
    @InjectRepository(Equipo) private equipoRepo: Repository<Equipo>,
    @InjectRepository(Torneo) private torneoRepo: Repository<Torneo>,
    @InjectRepository(Jugador) private jugadorRepo: Repository<Jugador>
  ) { }

  async findAll() {
    return this.GolesRepo.find({
      relations: ['equipo', 'partido', 'jugador', 'torneo'],
    });
  }


  async findOne(id: number) {
    const Goles = await this.GolesRepo.findOne({
      where: { id },
      relations: ['equipo', 'partido', 'jugador', 'torneo'],
    });

    if (!Goles) {
      throw new NotFoundException(`Goles #${id} no encontrado`);
    }

    return Goles;
  }


  async create(createGolDto: CreateGolDto): Promise<Gol> {
    const { partidoId, equipoId, jugadorId, torneoId, minuto } = createGolDto;

    // Verificar si las entidades relacionadas existen
    const partido = await this.partidoRepo.findOne({ where: { id: partidoId } });
    if (!partido) {
      throw new NotFoundException(`El partido con ID ${partidoId} no fue encontrado`);
    }

    const equipo = await this.equipoRepo.findOne({ where: { id: equipoId } });
    if (!equipo) {
      throw new NotFoundException(`El equipo con ID ${equipoId} no fue encontrado`);
    }

    const jugador = await this.jugadorRepo.findOne({ where: { id: jugadorId } });
    if (!jugador) {
      throw new NotFoundException(`El jugador con ID ${jugadorId} no fue encontrado`);
    }

    const torneo = await this.torneoRepo.findOne({ where: { id: torneoId } });
    if (!torneo) {
      throw new NotFoundException(`El torneo con ID ${torneoId} no fue encontrado`);
    }

    // Crear un nuevo gol
    const gol = this.GolesRepo.create({
      partido,
      equipo,
      jugador,
      torneo,
      minuto,
    });

    return this.GolesRepo.save(gol);
  }

  async update(id: number, changes: UpdateGolDto) {
    const upGoles = await this.GolesRepo.findOne({ id });
    this.GolesRepo.merge(upGoles, changes);
    return this.GolesRepo.save(upGoles);
  }

  remove(id: number) {
    return this.GolesRepo.delete(id);
  }
}
