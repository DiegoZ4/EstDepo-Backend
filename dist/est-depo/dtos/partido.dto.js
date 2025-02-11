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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePartidoDto = exports.CreatePartidoDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreatePartidoDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { fecha: { required: true, type: () => String }, date: { required: true, type: () => Date }, equipoLocalId: { required: true, type: () => Number }, equipoVisitanteId: { required: true, type: () => Number }, goles: { required: true, type: () => [Number] }, golesLocal: { required: true, type: () => Number }, golesVisitante: { required: true, type: () => Number }, torneoId: { required: true, type: () => Number }, categoriaId: { required: true, type: () => Number }, estado: { required: true, type: () => String }, ganador: { required: true, type: () => Number } };
    }
}
exports.CreatePartidoDto = CreatePartidoDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ description: 'The fecha of the partido' }),
    __metadata("design:type", String)
], CreatePartidoDto.prototype, "fecha", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ description: 'The date of the partido' }),
    __metadata("design:type", Date)
], CreatePartidoDto.prototype, "date", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ description: 'The equipo local ID' }),
    __metadata("design:type", Number)
], CreatePartidoDto.prototype, "equipoLocalId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ description: 'The equipo visitante ID' }),
    __metadata("design:type", Number)
], CreatePartidoDto.prototype, "equipoVisitanteId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, swagger_1.ApiProperty)({ description: 'The goles of the partido' }),
    __metadata("design:type", Array)
], CreatePartidoDto.prototype, "goles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The number of goals scored by the local team' }),
    __metadata("design:type", Number)
], CreatePartidoDto.prototype, "golesLocal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The number of goals scored by the visiting team' }),
    __metadata("design:type", Number)
], CreatePartidoDto.prototype, "golesVisitante", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ description: 'The torneo ID' }),
    __metadata("design:type", Number)
], CreatePartidoDto.prototype, "torneoId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ description: 'The categoria ID' }),
    __metadata("design:type", Number)
], CreatePartidoDto.prototype, "categoriaId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'The estado of the partido',
        default: 'Pendiente',
        enum: ['Pendiente', 'Finalizado'],
    }),
    __metadata("design:type", String)
], CreatePartidoDto.prototype, "estado", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: 'The ganador of the partido' }),
    __metadata("design:type", Number)
], CreatePartidoDto.prototype, "ganador", void 0);
class UpdatePartidoDto extends (0, swagger_1.PartialType)(CreatePartidoDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdatePartidoDto = UpdatePartidoDto;
//# sourceMappingURL=partido.dto.js.map