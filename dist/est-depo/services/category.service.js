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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("../entities/category.entity");
const torneo_entity_1 = require("../entities/torneo.entity");
const equipo_entity_1 = require("../entities/equipo.entity");
const jugador_entity_1 = require("../entities/jugador.entity");
const partido_entity_1 = require("../entities/partido.entity");
let CategoryService = class CategoryService {
    constructor(categoryRepository, torneoRepository, equipoRepository, jugadorRepository, partidoRepository) {
        this.categoryRepository = categoryRepository;
        this.torneoRepository = torneoRepository;
        this.equipoRepository = equipoRepository;
        this.jugadorRepository = jugadorRepository;
        this.partidoRepository = partidoRepository;
    }
    async findAll() {
        return this.categoryRepository.find({
            relations: ['torneo', 'equipos', 'jugadores', 'partidos'],
        });
    }
    async findOne(id) {
        const category = await this.categoryRepository.findOne({
            where: { id },
            relations: ['torneo', 'equipos', 'jugadores', 'partidos'],
        });
        if (!category) {
            throw new common_1.NotFoundException(`Category with ID ${id} not found`);
        }
        return category;
    }
    async create(createCategoryDto) {
        const { torneoId, equiposIds, jugadoresIds, partidosIds, ...data } = createCategoryDto;
        const equipos = equiposIds ? await this.equipoRepository.find({ where: { id: (0, typeorm_2.In)(equiposIds) } }) : [];
        const jugadores = jugadoresIds ? await this.jugadorRepository.find({ where: { id: (0, typeorm_2.In)(jugadoresIds) } }) : [];
        const partidos = partidosIds ? await this.partidoRepository.find({ where: { id: (0, typeorm_2.In)(partidosIds) } }) : [];
        const torneo = await this.torneoRepository.findOne(torneoId);
        const newCategory = this.categoryRepository.create({
            ...data,
            torneo: [torneo],
            equipos,
            jugadores,
            partidos,
        });
        return this.categoryRepository.save(newCategory);
    }
    async update(id, updateCategoryDto) {
        const category = await this.findOne(id);
        const { torneoId, equiposIds, jugadoresIds, partidosIds, ...data } = updateCategoryDto;
        if (torneoId) {
            const torneo = await this.torneoRepository.findOne(torneoId);
            if (!torneo) {
                throw new common_1.NotFoundException(`Torneo with ID ${torneoId} not found`);
            }
            category.torneo = [torneo];
        }
        if (equiposIds) {
            const equipos = await this.equipoRepository.find({ where: { id: (0, typeorm_2.In)(equiposIds) } });
            category.equipos = equipos;
        }
        if (jugadoresIds) {
            const jugadores = await this.jugadorRepository.find({ where: { id: (0, typeorm_2.In)(jugadoresIds) } });
            category.jugadores = jugadores;
        }
        if (partidosIds) {
            const partidos = await this.partidoRepository.find({ where: { id: (0, typeorm_2.In)(partidosIds) } });
            category.partidos = partidos;
        }
        this.categoryRepository.merge(category, data);
        return this.categoryRepository.save(category);
    }
    async delete(id) {
        const category = await this.findOne(id);
        await this.categoryRepository.remove(category);
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __param(1, (0, typeorm_1.InjectRepository)(torneo_entity_1.Torneo)),
    __param(2, (0, typeorm_1.InjectRepository)(equipo_entity_1.Equipo)),
    __param(3, (0, typeorm_1.InjectRepository)(jugador_entity_1.Jugador)),
    __param(4, (0, typeorm_1.InjectRepository)(partido_entity_1.Partido)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CategoryService);
//# sourceMappingURL=category.service.js.map