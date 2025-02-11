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
exports.GolesService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const pg_1 = require("pg");
const goles_entity_1 = require("../entities/goles.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const equipo_entity_1 = require("../entities/equipo.entity");
const torneo_entity_1 = require("../entities/torneo.entity");
const jugador_entity_1 = require("../entities/jugador.entity");
const partido_entity_1 = require("../entities/partido.entity");
let GolesService = class GolesService {
    constructor(configService, clientPg, GolesRepo, partidoRepo, equipoRepo, torneoRepo, jugadorRepo) {
        this.configService = configService;
        this.clientPg = clientPg;
        this.GolesRepo = GolesRepo;
        this.partidoRepo = partidoRepo;
        this.equipoRepo = equipoRepo;
        this.torneoRepo = torneoRepo;
        this.jugadorRepo = jugadorRepo;
    }
    async findAll() {
        return this.GolesRepo.find({
            relations: ['equipo', 'partido', 'jugador', 'torneo'],
        });
    }
    async findOne(id) {
        const Goles = await this.GolesRepo.findOne({
            where: { id },
            relations: ['equipo', 'partido', 'jugador', 'torneo'],
        });
        if (!Goles) {
            throw new common_1.NotFoundException(`Goles #${id} no encontrado`);
        }
        return Goles;
    }
    async create(createGolDto) {
        const { partidoId, equipoId, jugadorId, torneoId, minuto } = createGolDto;
        const partido = await this.partidoRepo.findOne({ where: { id: partidoId } });
        if (!partido) {
            throw new common_1.NotFoundException(`El partido con ID ${partidoId} no fue encontrado`);
        }
        const equipo = await this.equipoRepo.findOne({ where: { id: equipoId } });
        if (!equipo) {
            throw new common_1.NotFoundException(`El equipo con ID ${equipoId} no fue encontrado`);
        }
        const jugador = await this.jugadorRepo.findOne({ where: { id: jugadorId } });
        if (!jugador) {
            throw new common_1.NotFoundException(`El jugador con ID ${jugadorId} no fue encontrado`);
        }
        const torneo = await this.torneoRepo.findOne({ where: { id: torneoId } });
        if (!torneo) {
            throw new common_1.NotFoundException(`El torneo con ID ${torneoId} no fue encontrado`);
        }
        const gol = this.GolesRepo.create({
            partido,
            equipo,
            jugador,
            torneo,
            minuto,
        });
        return this.GolesRepo.save(gol);
    }
    async update(id, changes) {
        const upGoles = await this.GolesRepo.findOne({ id });
        this.GolesRepo.merge(upGoles, changes);
        return this.GolesRepo.save(upGoles);
    }
    remove(id) {
        return this.GolesRepo.delete(id);
    }
};
exports.GolesService = GolesService;
exports.GolesService = GolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('PG')),
    __param(2, (0, typeorm_2.InjectRepository)(goles_entity_1.Gol)),
    __param(3, (0, typeorm_2.InjectRepository)(partido_entity_1.Partido)),
    __param(4, (0, typeorm_2.InjectRepository)(equipo_entity_1.Equipo)),
    __param(5, (0, typeorm_2.InjectRepository)(torneo_entity_1.Torneo)),
    __param(6, (0, typeorm_2.InjectRepository)(jugador_entity_1.Jugador)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        pg_1.Client,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], GolesService);
//# sourceMappingURL=goles.service.js.map