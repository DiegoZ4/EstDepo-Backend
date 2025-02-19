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
exports.JugadorController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const parse_int_pipe_1 = require("../../common/parse-int/parse-int.pipe");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/jwt.auth.guard");
const jugador_service_1 = require("../services/jugador.service");
const jugador_dto_1 = require("../dtos/jugador.dto");
let JugadorController = class JugadorController {
    constructor(jugadorService) {
        this.jugadorService = jugadorService;
    }
    async getJugadores(equipoId) {
        if (equipoId) {
            return this.jugadorService.findByEquipo(parseInt(equipoId));
        }
        else {
            return this.jugadorService.findAll();
        }
    }
    getAll() {
        return this.jugadorService.findAll();
    }
    getRankingGoleadores() {
        return this.jugadorService.getRankingGoleadores();
    }
    getOne(id) {
        return this.jugadorService.findOne(id);
    }
    create(payload) {
        return this.jugadorService.create(payload);
    }
    update(id, payload) {
        return this.jugadorService.update(id, payload);
    }
    delete(id) {
        return this.jugadorService.remove(id);
    }
};
exports.JugadorController = JugadorController;
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("../entities/jugador.entity").Jugador] }),
    __param(0, (0, common_1.Query)('equipo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JugadorController.prototype, "getJugadores", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("../entities/jugador.entity").Jugador] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], JugadorController.prototype, "getAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('Goleadores'),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], JugadorController.prototype, "getRankingGoleadores", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("../entities/jugador.entity").Jugador }),
    __param(0, (0, common_1.Param)('id', parse_int_pipe_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], JugadorController.prototype, "getOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("../entities/jugador.entity").Jugador }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [jugador_dto_1.CreateJugadorDto]),
    __metadata("design:returntype", void 0)
], JugadorController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(':id'),
    openapi.ApiResponse({ status: 200, type: require("../entities/jugador.entity").Jugador }),
    __param(0, (0, common_1.Param)('id', parse_int_pipe_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, jugador_dto_1.UpdateJugadorDto]),
    __metadata("design:returntype", void 0)
], JugadorController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', parse_int_pipe_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], JugadorController.prototype, "delete", null);
exports.JugadorController = JugadorController = __decorate([
    (0, swagger_1.ApiTags)('jugadores'),
    (0, common_1.Controller)('jugador'),
    __metadata("design:paramtypes", [jugador_service_1.JugadorService])
], JugadorController);
//# sourceMappingURL=jugador.controller.js.map