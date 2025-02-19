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
exports.JugadorService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const pg_1 = require("pg");
const pais_entity_1 = require("../entities/pais.entity");
const equipo_entity_1 = require("../entities/equipo.entity");
const category_entity_1 = require("../entities/category.entity");
const goles_entity_1 = require("../entities/goles.entity");
const jugador_entity_1 = require("../entities/jugador.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let JugadorService = class JugadorService {
    constructor(configService, paisRepo, equipoRepo, clientPg, golesRepo, categoryRepo, jugadorRepo) {
        this.configService = configService;
        this.paisRepo = paisRepo;
        this.equipoRepo = equipoRepo;
        this.clientPg = clientPg;
        this.golesRepo = golesRepo;
        this.categoryRepo = categoryRepo;
        this.jugadorRepo = jugadorRepo;
    }
    findAll() {
        const apiKey = this.configService.get('API_KEY');
        const dbName = this.configService.get('DATABASE_NAME');
        console.log(apiKey, dbName);
        return this.jugadorRepo.find();
    }
    async getRankingGoleadores() {
        const ranking = await this.jugadorRepo
            .createQueryBuilder('jugador')
            .leftJoin('jugador.equipo', 'equipo')
            .leftJoin('jugador.category', 'category')
            .leftJoin('jugador.gol', 'gol')
            .leftJoin('gol.torneo', 'torneo')
            .select([
            'equipo.id AS equipoId',
            'equipo.name AS equipoName',
            'jugador.id AS jugadorId',
            'jugador.name AS jugadorName',
            'torneo.id AS torneoId',
            'torneo.name AS torneoName',
            'category.id AS categoriaId',
            'category.name AS categoriaName',
            'COALESCE(COUNT(gol.id), 0) AS totalGoles',
        ])
            .groupBy('jugador.id, jugador.name, equipo.id, equipo.name, torneo.id, torneo.name, category.id, category.name')
            .orderBy('totalGoles', 'DESC')
            .getRawMany();
        return ranking;
    }
    async findOne(id) {
        const jugador = await this.jugadorRepo.findOne({ where: { id }, relations: ['equipo', 'pais', 'category'] });
        if (!jugador) {
            throw new common_1.NotFoundException(`Jugador #${id} not found`);
        }
        const baseUrl = this.configService.get('API_URL') || 'http://stats.zetaserver.com.ar';
        if (jugador.image && !jugador.image.startsWith('http')) {
            jugador.image = `${baseUrl}/img/jugadores/${jugador.image}`;
        }
        return jugador;
    }
    async findByEquipo(equipoId) {
        const result = await this.jugadorRepo.find({
            where: { equipo: { id: equipoId } },
            relations: ['equipo'],
        });
        return result;
    }
    async create(data) {
        const pais = await this.paisRepo.findOne({ where: { id: data.paisId } });
        if (!pais) {
            throw new Error('País no encontrado');
        }
        const equipo = await this.equipoRepo.findOne({ where: { id: data.equipoId } });
        if (!equipo) {
            throw new Error('Equipo no encontrado');
        }
        const newJugador = this.jugadorRepo.create({
            ...data,
            pais,
            equipo
        });
        return this.jugadorRepo.save(newJugador);
    }
    async update(id, updateJugadorDto) {
        const jugador = await this.jugadorRepo.findOne({ where: { id } });
        if (!jugador) {
            throw new common_1.NotFoundException('Jugador not found');
        }
        if (updateJugadorDto.paisId) {
            jugador.pais = await this.paisRepo.findOne({
                where: { id: updateJugadorDto.paisId },
            });
        }
        if (updateJugadorDto.equipoId) {
            jugador.equipo = await this.equipoRepo.findOne({
                where: { id: updateJugadorDto.equipoId },
            });
        }
        if (updateJugadorDto.categoriesId) {
            jugador.category = await this.categoryRepo.findOne({
                where: { id: updateJugadorDto.categoriesId },
            });
        }
        Object.assign(jugador, updateJugadorDto);
        return this.jugadorRepo.save(jugador);
    }
    remove(id) {
        return this.jugadorRepo.delete(id);
    }
};
exports.JugadorService = JugadorService;
exports.JugadorService = JugadorService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_2.InjectRepository)(pais_entity_1.Pais)),
    __param(2, (0, typeorm_2.InjectRepository)(equipo_entity_1.Equipo)),
    __param(3, (0, common_1.Inject)('PG')),
    __param(4, (0, typeorm_2.InjectRepository)(goles_entity_1.Gol)),
    __param(5, (0, typeorm_2.InjectRepository)(category_entity_1.Category)),
    __param(6, (0, typeorm_2.InjectRepository)(jugador_entity_1.Jugador)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        typeorm_1.Repository,
        typeorm_1.Repository,
        pg_1.Client,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], JugadorService);
//# sourceMappingURL=jugador.service.js.map