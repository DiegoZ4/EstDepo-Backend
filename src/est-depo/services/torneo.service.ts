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
      // Relaciones limitadas para evitar referencias circulares
      relations: ['pais'],
    });
  }


  async findOne(id: number) {
    const torneo = await this.torneoRepo.findOne(id, {
      // Relaciones limitadas para evitar referencias circulares
      relations: ['pais'],
    });

    if (!torneo) {
      throw new NotFoundException(`torneo #${id} not found`);
    }

    return torneo;
  }


  // torneo.service.ts o directamente en el controller si preferís
  async getTorneoConPartidosAgrupados(id: number) {
    const torneo = await this.torneoRepo.findOne({
      where: { id },
      relations: ["partidos", "partidos.equipoLocal", "partidos.equipoVisitante"],
    });

    const partidosAgrupados = torneo.partidos.reduce((acc, partido) => {
      const grupo = partido.group || "Sin Grupo";
      if (!acc[grupo]) acc[grupo] = [];
      acc[grupo].push(partido);
      return acc;
    }, {} as Record<string, Partido[]>);

    return {
      ...torneo,
      partidosPorGrupo: partidosAgrupados,
    };
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

  // torneo.service.ts
  async getTablaPorCategoriaAgrupada(
    torneoId: number,
    categoriaId: number
  ): Promise<Record<string, any[]>> {
    // … tus validaciones …

    const partidos = await this.partidoRepo.find({
      where: {
        estado: 'Finalizado',
        torneo: { id: torneoId },
        category: { id: categoriaId },
      },
      relations: ['equipoLocal', 'equipoVisitante', 'goles'],
    });

    // Primero, recabamos todas las IDs de equipos:
    const equiposIds = new Set<number>();
    partidos.forEach(p => {
      equiposIds.add(p.equipoLocal.id);
      equiposIds.add(p.equipoVisitante.id);
    });
    const equipos = await this.equipoRepo.findByIds(Array.from(equiposIds));
    const eqMap = new Map(equipos.map(e => [e.id, e]));

    // Vamos a acumular dos veces: una para local, otra para visitante
    const statsPorGrupo: Record<string, any[]> = {};

    partidos.forEach(p => {
      const golesLocal = p.goles.filter(g => g.equipo.id === p.equipoLocal.id).length;
      const golesVisit = p.goles.filter(g => g.equipo.id === p.equipoVisitante.id).length;

      // Función auxiliar para inicializar y devolver el stats array de un grupo
      const ensureGrupo = (grupo: string, equipoId: number) => {
        if (!statsPorGrupo[grupo]) statsPorGrupo[grupo] = [];
        let st = statsPorGrupo[grupo].find(s => s.equipo.id === equipoId);
        if (!st) {
          const equipo = eqMap.get(equipoId)!;
          st = { equipo, Pts: 0, PJ: 0, PG: 0, PE: 0, PP: 0, GF: 0, GC: 0, DIF: 0 };
          statsPorGrupo[grupo].push(st);
        }
        return st;
      };

      // **Local**: usa p.groupLocal o "General"
      const gLocal = p.groupLocal?.trim() || p.group;
      const stLocal = ensureGrupo(gLocal, p.equipoLocal.id);
      stLocal.PJ++; stLocal.GF += golesLocal; stLocal.GC += golesVisit;
      if (golesLocal > golesVisit) { stLocal.Pts += 3; stLocal.PG++; }
      else if (golesLocal < golesVisit) { stLocal.PP++; }
      else { stLocal.Pts++; stLocal.PE++; }
      stLocal.DIF = stLocal.GF - stLocal.GC;

      // **Visitante**: usa p.groupVisitante o "General"
      const gVisit = p.groupVisitante?.trim() || p.group;
      const stVisit = ensureGrupo(gVisit, p.equipoVisitante.id);
      stVisit.PJ++; stVisit.GF += golesVisit; stVisit.GC += golesLocal;
      if (golesVisit > golesLocal) { stVisit.Pts += 3; stVisit.PG++; }
      else if (golesVisit < golesLocal) { stVisit.PP++; }
      else { stVisit.Pts++; stVisit.PE++; }
      stVisit.DIF = stVisit.GF - stVisit.GC;
    });

    // Finalmente ordena cada grupo por Pts, DIF, GF:
    Object.values(statsPorGrupo).forEach(arr =>
      arr.sort((a, b) => b.Pts - a.Pts || b.DIF - a.DIF || b.GF - a.GF)
    );

    return statsPorGrupo;
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

  async getCategoriasDelTorneo(id: number) {
    const torneo = await this.torneoRepo.findOne({
      where: { id },
      relations: ['categories'],
    });

    if (!torneo) {
      throw new NotFoundException(`Torneo con ID ${id} no encontrado`);
    }

    return torneo.categories;
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
