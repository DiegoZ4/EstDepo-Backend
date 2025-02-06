import { Injectable, Inject, NotFoundException } from '@nestjs/common';

import { ConfigService, ConfigType } from '@nestjs/config';
import { Client } from 'pg';

import { Pais } from '../entities/pais.entity';
import { CreatePaisDto, UpdatePaisDto } from '../dtos/pais.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PaisService {

  constructor(
    private configService: ConfigService,
    @Inject('PG') private clientPg: Client,
    @InjectRepository(Pais) private paisRepo: Repository<Pais>
  ) { }

  findAll() {
    const apiKey = this.configService.get('API_KEY');
    const dbName = this.configService.get('DATABASE_NAME');
    console.log(apiKey, dbName,);

    return this.paisRepo.find();
  }

  async findOne(id: number) {
    const pais = await this.paisRepo.findOne({ id });
    if (pais) {
      return pais;
    } else {
      throw new NotFoundException(`pais #${id} not found`);
    }

  }

  async create(data: CreatePaisDto) {
    const newPais = this.paisRepo.create(data);
    return this.paisRepo.save(newPais);
  }

  async update(id: number, changes: UpdatePaisDto) {
    const upPais = await this.paisRepo.findOne({ id });
    this.paisRepo.merge(upPais, changes);
    return this.paisRepo.save(upPais);
  }

  remove(id: number) {
    return this.paisRepo.delete(id);
  }
}
