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
exports.PartidoService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const pg_1 = require("pg");
const partido_entity_1 = require("../entities/partido.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const equipo_entity_1 = require("../entities/equipo.entity");
const torneo_entity_1 = require("../entities/torneo.entity");
const jugador_entity_1 = require("../entities/jugador.entity");
const category_entity_1 = require("../entities/category.entity");
const goles_entity_1 = require("../entities/goles.entity");
let PartidoService = class PartidoService {
    constructor(configService, clientPg, partidoRepo, equipoRepo, torneoRepo, jugadorRepo, categoryRepo, golRepo) {
        this.configService = configService;
        this.clientPg = clientPg;
        this.partidoRepo = partidoRepo;
        this.equipoRepo = equipoRepo;
        this.torneoRepo = torneoRepo;
        this.jugadorRepo = jugadorRepo;
        this.categoryRepo = categoryRepo;
        this.golRepo = golRepo;
    }
    async findAll() {
        return this.partidoRepo.find({
            relations: [
                'goles',
                'equipoVisitante',
                'equipoLocal',
                'torneo',
                'category'
            ],
        });
    }
    async findOne(id) {
        const partido = await this.partidoRepo.findOne({
            where: { id },
            relations: ['equipoLocal', 'equipoVisitante', 'torneo', 'category', 'goles'],
        });
        if (!partido) {
            throw new common_1.NotFoundException(`Partido #${id} no encontrado`);
        }
        return partido;
    }
    async create(createPartidoDto) {
        const { fecha, date, equipoLocalId, equipoVisitanteId, torneoId, categoriaId, estado } = createPartidoDto;
        const equipoLocal = await this.equipoRepo.findOne({ where: { id: equipoLocalId } });
        if (!equipoLocal) {
            throw new common_1.NotFoundException(`Equipo local con ID ${equipoLocalId} no encontrado`);
        }
        const equipoVisitante = await this.equipoRepo.findOne({ where: { id: equipoVisitanteId } });
        if (!equipoVisitante) {
            throw new common_1.NotFoundException(`Equipo visitante con ID ${equipoVisitanteId} no encontrado`);
        }
        const torneo = await this.torneoRepo.findOne({ where: { id: torneoId } });
        if (!torneo) {
            throw new common_1.NotFoundException(`Torneo con ID ${torneoId} no encontrado`);
        }
        const category = await this.categoryRepo.findOne({ where: { id: categoriaId } });
        if (!category) {
            throw new common_1.NotFoundException(`Categoría con ID ${categoriaId} no encontrada`);
        }
        const partido = this.partidoRepo.create({
            fecha,
            date,
            equipoLocal,
            equipoVisitante,
            torneo,
            category,
            estado,
        });
        return await this.partidoRepo.save(partido);
    }
    async update(id, updatePartidoDto) {
        const partido = await this.partidoRepo.findOne({ where: { id } });
        if (!partido) {
            throw new common_1.NotFoundException('Partido not found');
        }
        if (updatePartidoDto.equipoLocalId) {
            partido.equipoLocal = await this.equipoRepo.findOne({
                where: { id: updatePartidoDto.equipoLocalId },
            });
        }
        if (updatePartidoDto.equipoVisitanteId) {
            partido.equipoVisitante = await this.equipoRepo.findOne({
                where: { id: updatePartidoDto.equipoVisitanteId },
            });
        }
        if (updatePartidoDto.torneoId) {
            partido.torneo = await this.torneoRepo.findOne({
                where: { id: updatePartidoDto.torneoId },
            });
        }
        if (updatePartidoDto.categoriaId) {
            partido.category = await this.categoryRepo.findOne({
                where: { id: updatePartidoDto.categoriaId },
            });
        }
        Object.assign(partido, updatePartidoDto);
        return this.partidoRepo.save(partido);
    }
    remove(id) {
        return this.partidoRepo.delete(id);
    }
    async validateEquipos(equipoLocalId, equipoVisitanteId) {
        const equipoLocal = await this.equipoRepo.findOne({ where: { id: equipoLocalId } });
        const equipoVisitante = await this.equipoRepo.findOne({ where: { id: equipoVisitanteId } });
        if (!equipoLocal || !equipoVisitante) {
            throw new common_1.NotFoundException('One of the teams was not found');
        }
        return { equipoLocal, equipoVisitante };
    }
};
exports.PartidoService = PartidoService;
exports.PartidoService = PartidoService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('PG')),
    __param(2, (0, typeorm_2.InjectRepository)(partido_entity_1.Partido)),
    __param(3, (0, typeorm_2.InjectRepository)(equipo_entity_1.Equipo)),
    __param(4, (0, typeorm_2.InjectRepository)(torneo_entity_1.Torneo)),
    __param(5, (0, typeorm_2.InjectRepository)(jugador_entity_1.Jugador)),
    __param(6, (0, typeorm_2.InjectRepository)(category_entity_1.Category)),
    __param(7, (0, typeorm_2.InjectRepository)(goles_entity_1.Gol)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        pg_1.Client,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], PartidoService);
//# sourceMappingURL=partido.service.js.map