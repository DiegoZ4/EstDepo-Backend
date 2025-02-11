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
exports.PaisService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const pg_1 = require("pg");
const pais_entity_1 = require("../entities/pais.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let PaisService = class PaisService {
    constructor(configService, clientPg, paisRepo) {
        this.configService = configService;
        this.clientPg = clientPg;
        this.paisRepo = paisRepo;
    }
    findAll() {
        const apiKey = this.configService.get('API_KEY');
        const dbName = this.configService.get('DATABASE_NAME');
        console.log(apiKey, dbName);
        return this.paisRepo.find();
    }
    async findOne(id) {
        const pais = await this.paisRepo.findOne({ id });
        if (pais) {
            return pais;
        }
        else {
            throw new common_1.NotFoundException(`pais #${id} not found`);
        }
    }
    async create(data) {
        const newPais = this.paisRepo.create(data);
        return this.paisRepo.save(newPais);
    }
    async update(id, changes) {
        const upPais = await this.paisRepo.findOne({ id });
        this.paisRepo.merge(upPais, changes);
        return this.paisRepo.save(upPais);
    }
    remove(id) {
        return this.paisRepo.delete(id);
    }
};
exports.PaisService = PaisService;
exports.PaisService = PaisService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('PG')),
    __param(2, (0, typeorm_2.InjectRepository)(pais_entity_1.Pais)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        pg_1.Client,
        typeorm_1.Repository])
], PaisService);
//# sourceMappingURL=pais.service.js.map