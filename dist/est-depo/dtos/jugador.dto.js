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
exports.UpdateJugadorDto = exports.CreateJugadorDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateJugadorDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, image: { required: true, type: () => String }, description: { required: true, type: () => String }, edad: { required: true, type: () => Number }, paisId: { required: true, type: () => Number }, posicion: { required: true, type: () => String }, goles: { required: true, type: () => Number }, tarjetasRojas: { required: true, type: () => Number }, tarjetasAmarillas: { required: true, type: () => Number }, asistencias: { required: true, type: () => Number }, fechaNacimiento: { required: true, type: () => String }, altura: { required: true, type: () => Number }, peso: { required: true, type: () => Number }, equipoId: { required: true, type: () => Number }, categoriesId: { required: true, type: () => Number }, partidos: { required: true, type: () => Number } };
    }
}
exports.CreateJugadorDto = CreateJugadorDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ description: 'The name of the jugador' }),
    __metadata("design:type", String)
], CreateJugadorDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: 'The image of the jugador' }),
    __metadata("design:type", String)
], CreateJugadorDto.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: 'The description of the jugador' }),
    __metadata("design:type", String)
], CreateJugadorDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ description: 'The edad of the jugador' }),
    __metadata("design:type", Number)
], CreateJugadorDto.prototype, "edad", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ description: 'The ID of the nacionalidad (Pais)' }),
    __metadata("design:type", Number)
], CreateJugadorDto.prototype, "paisId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: 'The posicion of the jugador' }),
    __metadata("design:type", String)
], CreateJugadorDto.prototype, "posicion", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: 'The goles of the jugador' }),
    __metadata("design:type", Number)
], CreateJugadorDto.prototype, "goles", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: 'The tarjetas of the jugador' }),
    __metadata("design:type", Number)
], CreateJugadorDto.prototype, "tarjetasRojas", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: 'The tarjetasAmarillas of the jugador' }),
    __metadata("design:type", Number)
], CreateJugadorDto.prototype, "tarjetasAmarillas", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: 'The asistencias of the jugador' }),
    __metadata("design:type", Number)
], CreateJugadorDto.prototype, "asistencias", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: 'The fechaNacimiento of the jugador' }),
    __metadata("design:type", String)
], CreateJugadorDto.prototype, "fechaNacimiento", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: 'The altura of the jugador' }),
    __metadata("design:type", Number)
], CreateJugadorDto.prototype, "altura", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: 'The peso of the jugador' }),
    __metadata("design:type", Number)
], CreateJugadorDto.prototype, "peso", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ description: 'The ID of the equipo' }),
    __metadata("design:type", Number)
], CreateJugadorDto.prototype, "equipoId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ description: 'The ID of the category' }),
    __metadata("design:type", Number)
], CreateJugadorDto.prototype, "categoriesId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: 'The club of the jugador' }),
    __metadata("design:type", Number)
], CreateJugadorDto.prototype, "partidos", void 0);
class UpdateJugadorDto extends (0, swagger_1.PartialType)(CreateJugadorDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateJugadorDto = UpdateJugadorDto;
//# sourceMappingURL=jugador.dto.js.map