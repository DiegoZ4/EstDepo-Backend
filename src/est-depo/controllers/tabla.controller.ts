import { Controller, Get, Request, Response, Query, Inject } from '@nestjs/common';
import { TablaService } from '../services/tabla.service';
import { ParseIntPipe } from '../../common/parse-int/parse-int.pipe';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Partido } from '../entities/partido.entity';
import { Equipo } from '../entities/equipo.entity';
import { Torneo } from '../entities/torneo.entity';
import { Pais } from '../entities/pais.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from 'pg';

@ApiTags('Tabla')
@Controller('tabla')
export class TablaController {

  constructor(
    private readonly tablaService: TablaService,
    @Inject('PG') private clientPg: Client,
    @InjectRepository(Partido) private partidoRepository: Repository<Partido>,
    @InjectRepository(Equipo) private equipoRepository: Repository<Equipo>,
    @InjectRepository(Torneo) private torneoRepository: Repository<Torneo>,
    @InjectRepository(Pais) private paisRepository: Repository<Pais>,
  ) {
  }

  @Get()
  getTabla() {

  }


}
