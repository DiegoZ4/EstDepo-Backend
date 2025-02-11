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
exports.EquipoController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const parse_int_pipe_1 = require("../../common/parse-int/parse-int.pipe");
const swagger_1 = require("@nestjs/swagger");
const equipo_service_1 = require("../services/equipo.service");
const equipo_dto_1 = require("../dtos/equipo.dto");
let EquipoController = class EquipoController {
    constructor(equipoService) {
        this.equipoService = equipoService;
    }
    getAll() {
        return this.equipoService.findAll();
    }
    getOne(id) {
        return this.equipoService.findOne(id);
    }
    create(payload) {
        return this.equipoService.create(payload);
    }
    update(id, payload) {
        return this.equipoService.update(id, payload);
    }
    delete(id) {
        return this.equipoService.remove(id);
    }
};
exports.EquipoController = EquipoController;
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("../entities/equipo.entity").Equipo] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EquipoController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("../entities/equipo.entity").Equipo }),
    __param(0, (0, common_1.Param)('id', parse_int_pipe_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EquipoController.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("../entities/equipo.entity").Equipo }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [equipo_dto_1.CreateEquipoDto]),
    __metadata("design:returntype", void 0)
], EquipoController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    openapi.ApiResponse({ status: 200, type: require("../entities/equipo.entity").Equipo }),
    __param(0, (0, common_1.Param)('id', parse_int_pipe_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, equipo_dto_1.UpdateEquipoDto]),
    __metadata("design:returntype", void 0)
], EquipoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', parse_int_pipe_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EquipoController.prototype, "delete", null);
exports.EquipoController = EquipoController = __decorate([
    (0, swagger_1.ApiTags)('equipos'),
    (0, common_1.Controller)('equipo'),
    __metadata("design:paramtypes", [equipo_service_1.EquipoService])
], EquipoController);
//# sourceMappingURL=equipo.controller.js.map