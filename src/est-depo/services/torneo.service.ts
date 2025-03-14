import { Injectable, Inject, NotFoundException } from '@nestjs/common';

import { ConfigService, ConfigType } from '@nestjs/config';
import { Client } from 'pg';

import { Category } from '../entities/category.entity';
import { Equipo } from '../entities/equipo.entity';
import { Partido } from '../entities/partido.entity';
import { Pais } from '../entities/pais.entity';
import { Torneo } from '../entities/torneo.entity';
import { CreateTorneoDto, UpdateTorneoDto } from '../dtos/torneo.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TorneoService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(Torneo)
    private torneoRepo: Repository<Torneo>,
    @InjectRepository(Equipo)
    private equipoRepo: Repository<Equipo>,
    @InjectRepository(Partido)
    private partidoRepo: Repository<Partido>,
    @InjectRepository(Pais)
    private paisRepo: Repository<Pais>,
  ) { }

  findAll() {
    return this.torneoRepo.find({
      relations: ['categories', 'pais', 'partidos'],
    });
  }


  async findOne(id: number) {
    const torneo = await this.torneoRepo.findOne(id, {
      relations: ['pais', 'categories', 'partidos'],
    });

    if (!torneo) {
      throw new NotFoundException(`torneo #${id} not found`);
    }

    return torneo;
  }




  async create(data: CreateTorneoDto) {
    const pais = await this.paisRepo.findOne({ where: { id: data.paisId } });
    if (!pais) {
      throw new Error('País no encontrado');
    }

    const partidos = await this.partidoRepo.findByIds(data.partidosIds || []);
    const categories = await this.torneoRepo.manager
      .getRepository(Category)
      .findByIds(data.categoriesIds || []);

    const newTorneo = this.torneoRepo.create({
      ...data,
      pais,
      partidos,
      categories,
    });
    return this.torneoRepo.save(newTorneo);
  }

  async getTablaPorCategoria(torneoId: number, categoriaId: number) {
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

    const partidosFiltrados = await this.partidoRepo.find({
      where: {
        estado: 'Finalizado',
        torneo: { id: torneoId },
        category: { id: categoriaId },
      },
      relations: ['equipoLocal', 'equipoVisitante'],
    });

    // Obtener equipos que pertenecen a la categoría mediante QueryBuilder
    const equiposSet = new Set<number>();
    partidosFiltrados.forEach(partido => {
      equiposSet.add(partido.equipoLocal.id);
      equiposSet.add(partido.equipoVisitante.id);
    });
    const equipos = await this.equipoRepo.findByIds(Array.from(equiposSet));

    // Inicializar las estadísticas para cada equipo
    const stats = new Map<number, any>();
    equipos.forEach((equipo) => {
      stats.set(equipo.id, {
        equipo,
        Pts: 0,
        PJ: 0,
        PG: 0,
        PE: 0,
        PP: 0,
        GF: 0,
        GC: 0,
        DIF: 0,
      });
    });


    // Calcular estadísticas en función de los partidos filtrados
    partidosFiltrados.forEach(partido => {
      const local = stats.get(partido.equipoLocal.id);
      const visitante = stats.get(partido.equipoVisitante.id);

      if (!local || !visitante) return; // Seguridad por si falta un equipo

      local.PJ += 1;
      visitante.PJ += 1;

      local.GF += partido.golesLocal.length;
      local.GC += partido.golesVisitante.length;

      visitante.GF += partido.golesVisitante.length;
      visitante.GC += partido.golesLocal.length;

      if (partido.golesLocal > partido.golesVisitante) {
        local.Pts += 3;
        local.PG += 1;
        visitante.PP += 1;
      } else if (partido.golesLocal < partido.golesVisitante) {
        visitante.Pts += 3;
        visitante.PG += 1;
        local.PP += 1;
      } else {
        local.Pts += 1;
        visitante.Pts += 1;
        local.PE += 1;
        visitante.PE += 1;
      }

      local.DIF = local.GF - local.GC;
      visitante.DIF = visitante.GF - visitante.GC;
    });

    // Ordenar equipos según criterios
    const tabla = Array.from(stats.values()).sort((a, b) =>
      b.Pts - a.Pts ||
      b.DIF - a.DIF ||
      b.GF - a.GF
    );

    return tabla;
  }

  async getTablaGeneral() {
    const equipos = await this.equipoRepo.find();
    const partidos = await this.partidoRepo.find({
      where: { estado: 'Finalizado' },
      relations: ['equipoLocal', 'equipoVisitante'],
    });

    // Mapa para almacenar estadísticas de todos los equipos
    const stats = new Map<number, any>();

    // Inicializar equipos en el mapa
    equipos.forEach(equipo => {
      stats.set(equipo.id, {
        equipo,
        Pts: 0,
        PJ: 0,
        PG: 0,
        PE: 0,
        PP: 0,
        GF: 0,
        GC: 0,
        DIF: 0,
      });
    });

    // Calcular estadísticas por partido
    partidos.forEach(partido => {
      const local = stats.get(partido.equipoLocal.id);
      const visitante = stats.get(partido.equipoVisitante.id);

      if (!local || !visitante) return; // Seguridad por si falta un equipo

      local.PJ += 1;
      visitante.PJ += 1;

      local.GF += partido.golesLocal.length;
      local.GC += partido.golesVisitante.length;

      visitante.GF += partido.golesVisitante.length;
      visitante.GC += partido.golesLocal.length;

      if (partido.golesLocal > partido.golesVisitante) {
        local.Pts += 3;
        local.PG += 1;
        visitante.PP += 1;
      } else if (partido.golesLocal < partido.golesVisitante) {
        visitante.Pts += 3;
        visitante.PG += 1;
        local.PP += 1;
      } else {
        local.Pts += 1;
        visitante.Pts += 1;
        local.PE += 1;
        visitante.PE += 1;
      }

      local.DIF = local.GF - local.GC;
      visitante.DIF = visitante.GF - visitante.GC;
    });

    // Ordenar equipos según criterios
    const tabla = Array.from(stats.values()).sort((a, b) =>
      b.Pts - a.Pts ||
      b.DIF - a.DIF ||
      b.GF - a.GF
    );

    return tabla;
  }


  async update(id: number, changes: UpdateTorneoDto) {
    const torneo = await this.torneoRepo.findOne({ where: { id }, relations: ['partidos', 'pais'] });

    if (!torneo) {
      throw new NotFoundException(`Torneo #${id} no encontrado`);
    }

    if (changes.categoriesIds) {
      const categories = await this.torneoRepo.manager
        .getRepository(Category)
        .findByIds(changes.categoriesIds);
      torneo.categories = categories;
    }

    if (changes.partidosIds) {
      const partidos = await this.torneoRepo.manager
        .getRepository(Partido)
        .findByIds(changes.partidosIds);
      torneo.partidos = partidos;
    }
    if (changes.paisId) {
      const pais = await this.torneoRepo.manager
        .getRepository(Pais)
        .findOne({ where: { id: changes.paisId } });
      torneo.pais = pais;
    }

    this.torneoRepo.merge(torneo, changes);
    return this.torneoRepo.save(torneo);
  }


  remove(id: number) {
    return this.torneoRepo.delete(id);
  }
}
