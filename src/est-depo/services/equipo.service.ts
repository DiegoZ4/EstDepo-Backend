import { Injectable, Inject, NotFoundException } from '@nestjs/common';

import { ConfigService, ConfigType } from '@nestjs/config';
import { Client } from 'pg';

import { Equipo } from '../entities/equipo.entity';
import { CreateEquipoDto, UpdateEquipoDto } from '../dtos/equipo.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Pais } from '../entities/pais.entity';

@Injectable()
export class EquipoService {

  constructor(
    @InjectRepository(Pais) private paisRepo: Repository<Pais>,
    private configService: ConfigService,
    @Inject('PG') private clientPg: Client,
    @InjectRepository(Equipo) private equipoRepo: Repository<Equipo>
  ) { }

  async findAll() {
    const equipos = await this.equipoRepo.find({
      relations: ['pais'],
    });
    // Obtén la URL base de la configuración o usa un valor por defecto
    const baseUrl = this.configService.get<string>('API_URL') || 'http://localhost:3000';
    return equipos.map(equipo => {
      if (equipo.image && !equipo.image.startsWith('http')) {
        // Si solo se guarda el nombre del archivo, le agregamos el path completo
        equipo.image = `${baseUrl}/img/equipos/${equipo.image}`;
      }
      return equipo;
    });
  }


  async findOne(id: number) {
    const equipo = await this.equipoRepo.findOne({
      where: { id },
      relations: ['pais'],
    });
    if (!equipo) {
      throw new NotFoundException(`Equipo #${id} no encontrado`);
    }
    const baseUrl = this.configService.get<string>('API_URL') || 'http://localhost:3000';
    if (equipo.image && !equipo.image.startsWith('http')) {
      equipo.image = `${baseUrl}/img/equipos/${equipo.image}`;
    }
    return equipo;
  }


  async create(data: CreateEquipoDto) {
    const pais = await this.paisRepo.findOne({ where: { id: data.paisId } });
    if (!pais) {
      throw new Error('País no encontrado');
    }
    const newEquipo = this.equipoRepo.create({
      ...data,
      pais
    });
    return this.equipoRepo.save(newEquipo);
  }

  async update(id: number, changes: UpdateEquipoDto) {
    const upEquipo = await this.equipoRepo.findOne({ id });
    this.equipoRepo.merge(upEquipo, changes);
    return this.equipoRepo.save(upEquipo);
  }

  remove(id: number) {
    return this.equipoRepo.delete(id);
  }
}
