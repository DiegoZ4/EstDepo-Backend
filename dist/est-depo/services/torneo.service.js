"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TorneoService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const category_entity_1 = require("../entities/category.entity");
const equipo_entity_1 = require("../entities/equipo.entity");
const partido_entity_1 = require("../entities/partido.entity");
const pais_entity_1 = require("../entities/pais.entity");
const torneo_entity_1 = require("../entities/torneo.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let TorneoService = class TorneoService {
    constructor(configService, torneoRepo, equipoRepo, partidoRepo, paisRepo) {
        this.configService = configService;
        this.torneoRepo = torneoRepo;
        this.equipoRepo = equipoRepo;
        this.partidoRepo = partidoRepo;
        this.paisRepo = paisRepo;
    }
    findAll() {
        return this.torneoRepo.find({
            relations: ['categories', 'pais', 'partidos'],
        });
    }
    async findOne(id) {
        const torneo = await this.torneoRepo.findOne(id, {
            relations: ['pais', 'categories', 'partidos'],
        });
        if (!torneo) {
            throw new common_1.NotFoundException(`torneo #${id} not found`);
        }
        return torneo;
    }
    async create(data) {
        const pais = await this.paisRepo.findOne({ where: { id: data.paisId } });
        if (!pais) {
            throw new Error('País no encontrado');
        }
        const partidos = await this.partidoRepo.findByIds(data.partidosIds || []);
        const categories = await this.torneoRepo.manager
            .getRepository(category_entity_1.Category)
            .findByIds(data.categoriesIds || []);
        const newTorneo = this.torneoRepo.create({
            ...data,
            pais,
            partidos,
            categories,
        });
        return this.torneoRepo.save(newTorneo);
    }
    async getTablaGeneral() {
        const equipos = await this.equipoRepo.find();
        const partidos = await this.partidoRepo.find({
            where: { estado: 'Finalizado' },
            relations: ['equipoLocal', 'equipoVisitante'],
        });
        const stats = new Map();
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
        partidos.forEach(partido => {
            const local = stats.get(partido.equipoLocal.id);
            const visitante = stats.get(partido.equipoVisitante.id);
            if (!local || !visitante)
                return;
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
            }
            else if (partido.golesLocal < partido.golesVisitante) {
                visitante.Pts += 3;
                visitante.PG += 1;
                local.PP += 1;
            }
            else {
                local.Pts += 1;
                visitante.Pts += 1;
                local.PE += 1;
                visitante.PE += 1;
            }
            local.DIF = local.GF - local.GC;
            visitante.DIF = visitante.GF - visitante.GC;
        });
        const tabla = Array.from(stats.values()).sort((a, b) => b.Pts - a.Pts ||
            b.DIF - a.DIF ||
            b.GF - a.GF);
        return tabla;
    }
    async update(id, changes) {
        const torneo = await this.torneoRepo.findOne({ where: { id }, relations: ['partidos', 'pais'] });
        if (!torneo) {
            throw new common_1.NotFoundException(`Torneo #${id} no encontrado`);
        }
        if (changes.categoriesIds) {
            const categories = await this.torneoRepo.manager
                .getRepository(category_entity_1.Category)
                .findByIds(changes.categoriesIds);
            torneo.categories = categories;
        }
        if (changes.partidosIds) {
            const partidos = await this.torneoRepo.manager
                .getRepository(partido_entity_1.Partido)
                .findByIds(changes.partidosIds);
            torneo.partidos = partidos;
        }
        if (changes.paisId) {
            const pais = await this.torneoRepo.manager
                .getRepository(pais_entity_1.Pais)
                .findOne({ where: { id: changes.paisId } });
            torneo.pais = pais;
        }
        this.torneoRepo.merge(torneo, changes);
        return this.torneoRepo.save(torneo);
    }
    remove(id) {
        return this.torneoRepo.delete(id);
    }
};
exports.TorneoService = TorneoService;
exports.TorneoService = TorneoService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_2.InjectRepository)(torneo_entity_1.Torneo)),
    __param(2, (0, typeorm_2.InjectRepository)(equipo_entity_1.Equipo)),
    __param(3, (0, typeorm_2.InjectRepository)(partido_entity_1.Partido)),
    __param(4, (0, typeorm_2.InjectRepository)(pais_entity_1.Pais)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], TorneoService);
//# sourceMappingURL=torneo.service.js.map