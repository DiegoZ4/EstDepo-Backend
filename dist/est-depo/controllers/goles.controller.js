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
exports.GolesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const parse_int_pipe_1 = require("../../common/parse-int/parse-int.pipe");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/jwt.auth.guard");
const goles_service_1 = require("../services/goles.service");
const goles_dto_1 = require("../dtos/goles.dto");
let GolesController = class GolesController {
    constructor(golesService) {
        this.golesService = golesService;
    }
    getAll() {
        return this.golesService.findAll();
    }
    getOne(id) {
        return this.golesService.findOne(id);
    }
    create(payload) {
        return this.golesService.create(payload);
    }
    update(id, payload) {
        return this.golesService.update(id, payload);
    }
    delete(id) {
        return this.golesService.remove(id);
    }
};
exports.GolesController = GolesController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("../entities/goles.entity").Gol] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GolesController.prototype, "getAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("../entities/goles.entity").Gol }),
    __param(0, (0, common_1.Param)('id', parse_int_pipe_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], GolesController.prototype, "getOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("../entities/goles.entity").Gol }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [goles_dto_1.CreateGolDto]),
    __metadata("design:returntype", void 0)
], GolesController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(':id'),
    openapi.ApiResponse({ status: 200, type: require("../entities/goles.entity").Gol }),
    __param(0, (0, common_1.Param)('id', parse_int_pipe_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, goles_dto_1.UpdateGolDto]),
    __metadata("design:returntype", void 0)
], GolesController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', parse_int_pipe_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], GolesController.prototype, "delete", null);
exports.GolesController = GolesController = __decorate([
    (0, swagger_1.ApiTags)('goless'),
    (0, common_1.Controller)('goles'),
    __metadata("design:paramtypes", [goles_service_1.GolesService])
], GolesController);
//# sourceMappingURL=goles.controller.js.map