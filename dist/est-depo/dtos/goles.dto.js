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
exports.UpdateGolDto = exports.CreateGolDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateGolDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { jugadorId: { required: true, type: () => Number }, partidoId: { required: true, type: () => Number }, equipoId: { required: true, type: () => Number }, minuto: { required: true, type: () => Number }, torneoId: { required: true, type: () => Number } };
    }
}
exports.CreateGolDto = CreateGolDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ description: 'The jugador ID' }),
    __metadata("design:type", Number)
], CreateGolDto.prototype, "jugadorId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ description: 'The partido ID' }),
    __metadata("design:type", Number)
], CreateGolDto.prototype, "partidoId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ description: 'The equipo ID' }),
    __metadata("design:type", Number)
], CreateGolDto.prototype, "equipoId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ description: 'The minuto of the gol' }),
    __metadata("design:type", Number)
], CreateGolDto.prototype, "minuto", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ description: 'The torneo ID' }),
    __metadata("design:type", Number)
], CreateGolDto.prototype, "torneoId", void 0);
class UpdateGolDto extends (0, swagger_1.PartialType)(CreateGolDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateGolDto = UpdateGolDto;
//# sourceMappingURL=goles.dto.js.map