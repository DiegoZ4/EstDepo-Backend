import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Llave } from '../entities/llave.entity';
import { Fase } from '../entities/fase.entity';
import { Partido } from '../entities/partido.entity';
import { Equipo } from '../entities/equipo.entity';
import { Torneo } from '../entities/torneo.entity';
import { Category } from '../entities/category.entity';
import { CreateLlaveDto, UpdateLlaveDto, CerrarLlaveDto } from '../dtos/llave.dto';
import { GenerarBracketDto } from '../dtos/fase.dto';
import { FaseService } from './fase.service';
import { TablaService } from './tabla.service';

interface Seed {
  origen: string | null;
  equipoId: number | null;
}

@Injectable()
export class LlaveService {
  constructor(
    @InjectRepository(Llave) private llaveRepo: Repository<Llave>,
    @InjectRepository(Fase) private faseRepo: Repository<Fase>,
    @InjectRepository(Partido) private partidoRepo: Repository<Partido>,
    @InjectRepository(Equipo) private equipoRepo: Repository<Equipo>,
    @InjectRepository(Torneo) private torneoRepo: Repository<Torneo>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    private faseService: FaseService,
    private tablaService: TablaService,
  ) {}

  // ── CRUD ────────────────────────────────────────────────────────────

  async findByFase(faseId: number): Promise<Llave[]> {
    return this.llaveRepo.find({
      where: { faseId },
      relations: ['equipoLocal', 'equipoVisitante', 'ganadorEquipo'],
      order: { numero: 'ASC' },
    });
  }

  /** Bracket completo de un torneo/categoría: fases de eliminatoria + sus llaves. */
  async getBracket(torneoId: number, categoriaId?: number) {
    const where: any = { torneoId, tipo: 'eliminatoria' };
    if (categoriaId !== undefined) where.categoriaId = categoriaId;
    const fases = await this.faseRepo.find({ where, order: { orden: 'ASC' } });

    const out = [];
    for (const fase of fases) {
      out.push({ fase, llaves: await this.findByFase(fase.id) });
    }
    return out;
  }

  async findOne(id: number): Promise<Llave> {
    const llave = await this.llaveRepo.findOne({
      where: { id },
      relations: ['fase', 'equipoLocal', 'equipoVisitante', 'ganadorEquipo', 'partidos'],
    });
    if (!llave) throw new NotFoundException(`Llave #${id} no encontrada`);
    return llave;
  }

  async create(dto: CreateLlaveDto): Promise<Llave> {
    const fase = await this.faseRepo.findOne({ where: { id: dto.faseId } });
    if (!fase) throw new NotFoundException(`Fase #${dto.faseId} no encontrada`);

    const llave = this.llaveRepo.create({
      faseId: dto.faseId,
      categoriaId: dto.categoriaId ?? fase.categoriaId ?? null,
      numero: dto.numero,
      equipoLocalId: dto.equipoLocalId ?? null,
      equipoVisitanteId: dto.equipoVisitanteId ?? null,
      origenLocal: dto.origenLocal ?? null,
      origenVisitante: dto.origenVisitante ?? null,
      llaveSiguienteId: dto.llaveSiguienteId ?? null,
      ladoSiguiente: dto.ladoSiguiente ?? null,
    });
    return this.llaveRepo.save(llave);
  }

  async update(id: number, changes: UpdateLlaveDto): Promise<Llave> {
    const llave = await this.llaveRepo.findOne({ where: { id } });
    if (!llave) throw new NotFoundException(`Llave #${id} no encontrada`);
    this.llaveRepo.merge(llave, changes as any);
    return this.llaveRepo.save(llave);
  }

  async remove(id: number) {
    const llave = await this.llaveRepo.findOne({ where: { id } });
    if (!llave) throw new NotFoundException(`Llave #${id} no encontrada`);
    return this.llaveRepo.delete(id);
  }

  // ── Generación del bracket desde la fase de grupos ───────────────────

  async generarBracketDesdeGrupos(faseGruposId: number, dto: GenerarBracketDto = {}) {
    const faseGrupos = await this.faseRepo.findOne({ where: { id: faseGruposId } });
    if (!faseGrupos) throw new NotFoundException(`Fase #${faseGruposId} no encontrada`);
    if (faseGrupos.tipo !== 'grupos') {
      throw new BadRequestException('La fase indicada no es de tipo "grupos"');
    }
    if (faseGrupos.categoriaId === null || faseGrupos.categoriaId === undefined) {
      throw new BadRequestException(
        'La fase de grupos debe tener categoría para poder armar el bracket',
      );
    }

    const torneo = await this.torneoRepo.findOne({ where: { id: faseGrupos.torneoId } });
    if (!torneo) throw new NotFoundException(`Torneo #${faseGrupos.torneoId} no encontrado`);

    const equiposPorGrupo = dto.equiposPorGrupo ?? torneo.equiposClasificanPorGrupo ?? 2;
    const idaVuelta = dto.idaVuelta ?? torneo.idaVueltaEliminatoria ?? false;
    const crearPartidos = dto.crearPartidos ?? true;

    // 1. Tabla de la fase de grupos, por grupo.
    const tabla = await this.tablaService.getTablaFaseGrupos(
      torneo.id,
      faseGrupos.categoriaId,
      faseGruposId,
    );

    const grupos = Object.keys(tabla).sort();
    if (grupos.length === 0) {
      throw new BadRequestException('No hay partidos finalizados en la fase de grupos');
    }

    // 2. Clasificados: los primeros N de cada grupo -> seeds "1A", "2A", …
    const firsts: Seed[] = [];
    const rest: Seed[] = [];
    for (const g of grupos) {
      const filas = tabla[g];
      for (let pos = 1; pos <= equiposPorGrupo; pos++) {
        const fila = filas[pos - 1];
        const seed: Seed = {
          origen: `${pos}${g}`,
          equipoId: fila ? fila.equipo.id : null,
        };
        if (pos === 1) firsts.push(seed);
        else rest.push(seed);
      }
    }
    const seeds: Seed[] = [...firsts, ...rest];
    const cantidad = seeds.length;
    if (cantidad < 2) throw new BadRequestException('Se necesitan al menos 2 clasificados');

    // 3. Escalera de fases de eliminatoria.
    const fases = await this.faseService.ensureFasesEliminatoria(
      torneo.id,
      faseGrupos.categoriaId,
      cantidad,
      { idaVuelta, tercerPuesto: dto.tercerPuesto },
    );
    const rondas = fases
      .filter((f) => f.nombre !== 'Tercer puesto')
      .sort((a, b) => a.orden - b.orden);
    const primera = rondas[0];
    const slots = primera.cantidadLlaves * 2;

    // Si ya hay llaves generadas para la primera ronda, no duplicar.
    const yaExisten = await this.llaveRepo.count({ where: { faseId: primera.id } });
    if (yaExisten > 0) {
      throw new BadRequestException(
        'El bracket de esta categoría ya fue generado. Borrá las llaves para regenerarlo.',
      );
    }

    // 4. Padding a potencia de 2: los mejores seeds reciben bye.
    const padded: Seed[] = [...seeds];
    while (padded.length < slots) padded.push({ origen: null, equipoId: null });

    // 5. Crear las llaves de todas las rondas (vacías) y cablear el árbol.
    //    llavesPorRonda[r][k] = Llave (k: 0-based)
    const llavesPorRonda: Llave[][] = [];
    for (const fase of rondas) {
      const nivel: Llave[] = [];
      for (let k = 0; k < fase.cantidadLlaves; k++) {
        const llave = this.llaveRepo.create({
          faseId: fase.id,
          categoriaId: faseGrupos.categoriaId,
          numero: k + 1,
          equipoLocalId: null,
          equipoVisitanteId: null,
          origenLocal: null,
          origenVisitante: null,
          llaveSiguienteId: null,
          ladoSiguiente: null,
        });
        nivel.push(await this.llaveRepo.save(llave));
      }
      llavesPorRonda.push(nivel);
    }

    // Cablear ronda r -> r+1
    for (let r = 0; r < llavesPorRonda.length - 1; r++) {
      const actual = llavesPorRonda[r];
      const siguiente = llavesPorRonda[r + 1];
      for (let k = 0; k < actual.length; k++) {
        const destino = siguiente[Math.floor(k / 2)];
        const lado: 'local' | 'visitante' = k % 2 === 0 ? 'local' : 'visitante';
        actual[k].llaveSiguienteId = destino.id;
        actual[k].ladoSiguiente = lado;
        if (lado === 'local') destino.origenLocal = `G-LL${actual[k].numero}`;
        else destino.origenVisitante = `G-LL${actual[k].numero}`;
        await this.llaveRepo.save(actual[k]);
      }
      for (const l of siguiente) await this.llaveRepo.save(l);
    }

    // 6. Sembrar la primera ronda: 1 vs N, 2 vs N-1, …
    const primeraLlaves = llavesPorRonda[0];
    for (let i = 0; i < primeraLlaves.length; i++) {
      const local = padded[i];
      const visita = padded[slots - 1 - i];
      const llave = primeraLlaves[i];
      llave.equipoLocalId = local.equipoId;
      llave.equipoVisitanteId = visita.equipoId;
      llave.origenLocal = local.origen;
      llave.origenVisitante = visita.origen;

      // Bye: un solo equipo -> avanza directo.
      if (local.equipoId && !visita.equipoId) llave.ganadorEquipoId = local.equipoId;
      else if (!local.equipoId && visita.equipoId) llave.ganadorEquipoId = visita.equipoId;

      await this.llaveRepo.save(llave);

      if (llave.ganadorEquipoId) {
        await this.propagarGanador(llave, true);
      } else if (crearPartidos && llave.equipoLocalId && llave.equipoVisitanteId) {
        await this.crearPartidosDeLlave(llave, primera);
      }
    }

    return this.getBracket(torneo.id, faseGrupos.categoriaId);
  }

  // ── Cerrar una llave: ganador + propagación ─────────────────────────

  async cerrarLlave(llaveId: number, dto: CerrarLlaveDto = {}) {
    const llave = await this.llaveRepo.findOne({ where: { id: llaveId } });
    if (!llave) throw new NotFoundException(`Llave #${llaveId} no encontrada`);

    const fase = await this.faseRepo.findOne({ where: { id: llave.faseId } });
    const torneo = fase
      ? await this.torneoRepo.findOne({ where: { id: fase.torneoId } })
      : null;
    const criterio = torneo?.criterioDesempateLlave ?? 'penales';

    const ganadorEquipoId = await this.resolverGanador(llave, dto.ganadorEquipoId, criterio);
    llave.ganadorEquipoId = ganadorEquipoId;
    await this.llaveRepo.save(llave);

    const siguiente = await this.propagarGanador(
      llave,
      dto.crearPartidosSiguiente ?? true,
    );

    return { llave: await this.findOne(llave.id), siguiente };
  }

  private async resolverGanador(
    llave: Llave,
    ganadorManual: number | undefined,
    criterio: string,
  ): Promise<number> {
    const ids = [llave.equipoLocalId, llave.equipoVisitanteId].filter(Boolean) as number[];

    if (ganadorManual) {
      if (!ids.includes(ganadorManual)) {
        throw new BadRequestException('El ganador debe ser uno de los equipos de la llave');
      }
      return ganadorManual;
    }

    if (ids.length === 0) {
      throw new BadRequestException('La llave todavía no tiene equipos definidos');
    }
    if (ids.length === 1) return ids[0]; // bye

    const partidos = await this.partidoRepo.find({
      where: { llaveId: llave.id },
      relations: ['equipoLocal', 'equipoVisitante', 'goles', 'goles.equipo'],
      order: { esVuelta: 'ASC', id: 'ASC' },
    });
    if (partidos.length === 0) {
      throw new BadRequestException(
        'La llave no tiene partidos cargados. Mandá ganadorEquipoId para cerrarla manualmente.',
      );
    }

    const [a, b] = ids;
    let golA = 0, golB = 0;       // marcador agregado
    let awayA = 0, awayB = 0;     // goles de visitante (para criterio gol_visitante)

    for (const p of partidos) {
      const gl = (p.goles || []).filter((g) => g.equipo?.id === p.equipoLocal?.id).length;
      const gv = (p.goles || []).filter((g) => g.equipo?.id === p.equipoVisitante?.id).length;
      if (p.equipoLocal?.id === a) { golA += gl; golB += gv; awayB += gv; }
      else if (p.equipoLocal?.id === b) { golB += gl; golA += gv; awayA += gv; }
    }

    if (golA !== golB) return golA > golB ? a : b;

    // Empate en el agregado -> penales del último partido si están cargados.
    const conPenales = [...partidos]
      .reverse()
      .find((p) => p.golesLocalPenales != null && p.golesVisitantePenales != null);
    if (conPenales) {
      const localEsA = conPenales.equipoLocal?.id === a;
      const penA = localEsA ? conPenales.golesLocalPenales : conPenales.golesVisitantePenales;
      const penB = localEsA ? conPenales.golesVisitantePenales : conPenales.golesLocalPenales;
      if (penA !== penB) return penA > penB ? a : b;
    }

    if (criterio === 'gol_visitante' && awayA !== awayB) {
      return awayA > awayB ? a : b;
    }

    throw new BadRequestException(
      `Llave empatada y sin definición (${criterio}). Cargá los penales del partido o mandá ganadorEquipoId.`,
    );
  }

  /**
   * Empuja el ganador de `llave` a la llave siguiente (lado que corresponda).
   * Si la llave siguiente queda con los dos equipos, crea sus partidos.
   */
  private async propagarGanador(llave: Llave, crearPartidos: boolean) {
    if (!llave.ganadorEquipoId || !llave.llaveSiguienteId) return null;

    const siguiente = await this.llaveRepo.findOne({ where: { id: llave.llaveSiguienteId } });
    if (!siguiente) return null;

    if (llave.ladoSiguiente === 'visitante') {
      siguiente.equipoVisitanteId = llave.ganadorEquipoId;
    } else {
      siguiente.equipoLocalId = llave.ganadorEquipoId;
    }
    await this.llaveRepo.save(siguiente);

    if (
      crearPartidos &&
      siguiente.equipoLocalId &&
      siguiente.equipoVisitanteId
    ) {
      const faseSig = await this.faseRepo.findOne({ where: { id: siguiente.faseId } });
      const yaHay = await this.partidoRepo.count({ where: { llaveId: siguiente.id } });
      if (faseSig && yaHay === 0) {
        await this.crearPartidosDeLlave(siguiente, faseSig);
      }
    }

    return siguiente;
  }

  private async crearPartidosDeLlave(llave: Llave, fase: Fase) {
    const equipoLocal = await this.equipoRepo.findOne({ where: { id: llave.equipoLocalId } });
    const equipoVisitante = await this.equipoRepo.findOne({ where: { id: llave.equipoVisitanteId } });
    const torneo = await this.torneoRepo.findOne({ where: { id: fase.torneoId } });
    const category = fase.categoriaId
      ? await this.categoryRepo.findOne({ where: { id: fase.categoriaId } })
      : null;

    const base = {
      torneo,
      category: category as any,
      fase: { id: fase.id } as any,
      llave: { id: llave.id } as any,
      group: 'eliminatoria',
      estado: 'Pendiente',
      fechaDeterminada: false,
    };

    const ida = this.partidoRepo.create({
      ...base,
      fecha: fase.idaVuelta ? `${fase.nombre} - Ida` : fase.nombre,
      esVuelta: false,
      equipoLocal,
      equipoVisitante,
    });
    await this.partidoRepo.save(ida);

    if (fase.idaVuelta) {
      const vuelta = this.partidoRepo.create({
        ...base,
        fecha: `${fase.nombre} - Vuelta`,
        esVuelta: true,
        equipoLocal: equipoVisitante,
        equipoVisitante: equipoLocal,
      });
      await this.partidoRepo.save(vuelta);
    }
  }
}
