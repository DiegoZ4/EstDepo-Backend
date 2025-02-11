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
exports.PartidoController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const parse_int_pipe_1 = require("../../common/parse-int/parse-int.pipe");
const swagger_1 = require("@nestjs/swagger");
const partido_service_1 = require("../services/partido.service");
const partido_dto_1 = require("../dtos/partido.dto");
let PartidoController = class PartidoController {
    constructor(partidoService) {
        this.partidoService = partidoService;
    }
    getAll() {
        return this.partidoService.findAll();
    }
    getOne(id) {
        return this.partidoService.findOne(id);
    }
    create(payload) {
        return this.partidoService.create(payload);
    }
    update(id, payload) {
        return this.partidoService.update(id, payload);
    }
    delete(id) {
        return this.partidoService.remove(id);
    }
};
exports.PartidoController = PartidoController;
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("../entities/partido.entity").Partido] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PartidoController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("../entities/partido.entity").Partido }),
    __param(0, (0, common_1.Param)('id', parse_int_pipe_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PartidoController.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("../entities/partido.entity").Partido }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [partido_dto_1.CreatePartidoDto]),
    __metadata("design:returntype", void 0)
], PartidoController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    openapi.ApiResponse({ status: 200, type: require("../entities/partido.entity").Partido }),
    __param(0, (0, common_1.Param)('id', parse_int_pipe_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, partido_dto_1.UpdatePartidoDto]),
    __metadata("design:returntype", void 0)
], PartidoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', parse_int_pipe_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PartidoController.prototype, "delete", null);
exports.PartidoController = PartidoController = __decorate([
    (0, swagger_1.ApiTags)('partidos'),
    (0, common_1.Controller)('partido'),
    __metadata("design:paramtypes", [partido_service_1.PartidoService])
], PartidoController);
//# sourceMappingURL=partido.controller.js.map