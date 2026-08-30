import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Partido } from '../entities/partido.entity';

export interface FilaTabla {
  equipo: { id: number; name: string; image?: string };
  Pts: number;
  PJ: number;
  PG: number;
  PE: number;
  PP: number;
  GF: number;
  GC: number;
  DIF: number;
}

@Injectable()
export class TablaService {
  constructor(
    @InjectRepository(Partido) private partidoRepo: Repository<Partido>,
  ) {}

  /**
   * Tabla de posiciones de una fase de grupos (o de la liga clásica).
   * - Si se pasa `faseId`, solo cuenta los partidos de esa fase.
   * - Si `faseId` es null/undefined, cuenta los partidos SIN fase (liga clásica).
   * Devuelve las filas agrupadas por `group` (soporta partidos interzonales
   * mediante `groupLocal` / `groupVisitante`).
   */
  async getTablaFaseGrupos(
    torneoId: number,
    categoriaId: number,
    faseId?: number | null,
  ): Promise<Record<string, FilaTabla[]>> {
    const qb = this.partidoRepo
      .createQueryBuilder('p')
      .leftJoin('p.torneo', 'torneo')
      .leftJoin('p.category', 'category')
      .leftJoinAndSelect('p.equipoLocal', 'equipoLocal')
      .leftJoinAndSelect('p.equipoVisitante', 'equipoVisitante')
      .leftJoinAndSelect('p.goles', 'goles')
      .leftJoinAndSelect('goles.equipo', 'golEquipo')
      .where('p.estado = :estado', { estado: 'Finalizado' })
      .andWhere('torneo.id = :torneoId', { torneoId })
      .andWhere('category.id = :categoriaId', { categoriaId });

    if (faseId !== undefined && faseId !== null) {
      qb.andWhere('p.faseId = :faseId', { faseId });
    } else {
      qb.andWhere('p.faseId IS NULL');
    }

    const partidos = await qb.getMany();
    return this.computeStandings(partidos);
  }

  /**
   * Cálculo puro de la tabla a partir de una lista de partidos ya cargados
   * (con `equipoLocal`, `equipoVisitante` y `goles.equipo`).
   */
  computeStandings(partidos: Partido[]): Record<string, FilaTabla[]> {
    const statsPorGrupo: Record<string, FilaTabla[]> = {};

    const ensureFila = (grupo: string, equipo: any): FilaTabla => {
      const key = grupo || 'General';
      if (!statsPorGrupo[key]) statsPorGrupo[key] = [];
      let fila = statsPorGrupo[key].find((f) => f.equipo.id === equipo.id);
      if (!fila) {
        fila = {
          equipo: { id: equipo.id, name: equipo.name, image: equipo.image },
          Pts: 0, PJ: 0, PG: 0, PE: 0, PP: 0, GF: 0, GC: 0, DIF: 0,
        };
        statsPorGrupo[key].push(fila);
      }
      return fila;
    };

    for (const p of partidos) {
      if (!p.equipoLocal || !p.equipoVisitante) continue;

      const golesLocal = (p.goles || []).filter(
        (g) => g.equipo && g.equipo.id === p.equipoLocal.id,
      ).length;
      const golesVisit = (p.goles || []).filter(
        (g) => g.equipo && g.equipo.id === p.equipoVisitante.id,
      ).length;

      const grupoLocal = p.groupLocal?.trim() || p.group;
      const grupoVisit = p.groupVisitante?.trim() || p.group;

      const local = ensureFila(grupoLocal, p.equipoLocal);
      local.PJ++; local.GF += golesLocal; local.GC += golesVisit;
      if (golesLocal > golesVisit) { local.Pts += 3; local.PG++; }
      else if (golesLocal < golesVisit) { local.PP++; }
      else { local.Pts++; local.PE++; }
      local.DIF = local.GF - local.GC;

      const visit = ensureFila(grupoVisit, p.equipoVisitante);
      visit.PJ++; visit.GF += golesVisit; visit.GC += golesLocal;
      if (golesVisit > golesLocal) { visit.Pts += 3; visit.PG++; }
      else if (golesVisit < golesLocal) { visit.PP++; }
      else { visit.Pts++; visit.PE++; }
      visit.DIF = visit.GF - visit.GC;
    }

    Object.values(statsPorGrupo).forEach((arr) =>
      arr.sort((a, b) => b.Pts - a.Pts || b.DIF - a.DIF || b.GF - a.GF),
    );

    return statsPorGrupo;
  }
}
