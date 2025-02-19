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
exports.EquipoService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const pg_1 = require("pg");
const equipo_entity_1 = require("../entities/equipo.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const pais_entity_1 = require("../entities/pais.entity");
let EquipoService = class EquipoService {
    constructor(paisRepo, configService, clientPg, equipoRepo) {
        this.paisRepo = paisRepo;
        this.configService = configService;
        this.clientPg = clientPg;
        this.equipoRepo = equipoRepo;
    }
    async findAll() {
        const equipos = await this.equipoRepo.find({
            relations: ['pais'],
        });
        const baseUrl = this.configService.get('API_URL') || 'http://localhost:3000';
        return equipos.map(equipo => {
            if (equipo.image && !equipo.image.startsWith('http')) {
                equipo.image = `${baseUrl}/img/equipos/${equipo.image}`;
            }
            return equipo;
        });
    }
    async findOne(id) {
        const equipo = await this.equipoRepo.findOne({
            where: { id },
            relations: ['pais'],
        });
        if (!equipo) {
            throw new common_1.NotFoundException(`Equipo #${id} no encontrado`);
        }
        const baseUrl = this.configService.get('API_URL') || 'http://localhost:3000';
        if (equipo.image && !equipo.image.startsWith('http')) {
            equipo.image = `${baseUrl}/img/equipos/${equipo.image}`;
        }
        return equipo;
    }
    async create(data) {
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
    async update(id, changes) {
        const upEquipo = await this.equipoRepo.findOne({ id });
        this.equipoRepo.merge(upEquipo, changes);
        return this.equipoRepo.save(upEquipo);
    }
    remove(id) {
        return this.equipoRepo.delete(id);
    }
};
exports.EquipoService = EquipoService;
exports.EquipoService = EquipoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(pais_entity_1.Pais)),
    __param(2, (0, common_1.Inject)('PG')),
    __param(3, (0, typeorm_2.InjectRepository)(equipo_entity_1.Equipo)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        config_1.ConfigService,
        pg_1.Client,
        typeorm_1.Repository])
], EquipoService);
//# sourceMappingURL=equipo.service.js.map