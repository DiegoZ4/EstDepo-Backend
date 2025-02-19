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
exports.TablaController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const tabla_service_1 = require("../services/tabla.service");
const swagger_1 = require("@nestjs/swagger");
const partido_entity_1 = require("../entities/partido.entity");
const equipo_entity_1 = require("../entities/equipo.entity");
const torneo_entity_1 = require("../entities/torneo.entity");
const pais_entity_1 = require("../entities/pais.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pg_1 = require("pg");
const jwt_auth_guard_1 = require("../../auth/jwt.auth.guard");
let TablaController = class TablaController {
    constructor(tablaService, clientPg, partidoRepository, equipoRepository, torneoRepository, paisRepository) {
        this.tablaService = tablaService;
        this.clientPg = clientPg;
        this.partidoRepository = partidoRepository;
        this.equipoRepository = equipoRepository;
        this.torneoRepository = torneoRepository;
        this.paisRepository = paisRepository;
    }
    getTabla() {
    }
};
exports.TablaController = TablaController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TablaController.prototype, "getTabla", null);
exports.TablaController = TablaController = __decorate([
    (0, swagger_1.ApiTags)('Tabla'),
    (0, common_1.Controller)('tabla'),
    __param(1, (0, common_1.Inject)('PG')),
    __param(2, (0, typeorm_1.InjectRepository)(partido_entity_1.Partido)),
    __param(3, (0, typeorm_1.InjectRepository)(equipo_entity_1.Equipo)),
    __param(4, (0, typeorm_1.InjectRepository)(torneo_entity_1.Torneo)),
    __param(5, (0, typeorm_1.InjectRepository)(pais_entity_1.Pais)),
    __metadata("design:paramtypes", [tabla_service_1.TablaService,
        pg_1.Client,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], TablaController);
//# sourceMappingURL=tabla.controller.js.map