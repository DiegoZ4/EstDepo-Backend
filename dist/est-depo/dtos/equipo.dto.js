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
exports.UpdateEquipoDto = exports.CreateEquipoDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateEquipoDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, createdOn: { required: true, type: () => Number }, image: { required: true, type: () => String }, description: { required: true, type: () => String }, paisId: { required: true, type: () => Number } };
    }
}
exports.CreateEquipoDto = CreateEquipoDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ description: 'The name of the equipo' }),
    __metadata("design:type", String)
], CreateEquipoDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ description: 'fecha de creacion de un club' }),
    __metadata("design:type", Number)
], CreateEquipoDto.prototype, "createdOn", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: 'The image of the equipo' }),
    __metadata("design:type", String)
], CreateEquipoDto.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: 'The description of the equipo' }),
    __metadata("design:type", String)
], CreateEquipoDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: 'The id of the pais' }),
    __metadata("design:type", Number)
], CreateEquipoDto.prototype, "paisId", void 0);
class UpdateEquipoDto extends (0, swagger_1.PartialType)(CreateEquipoDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateEquipoDto = UpdateEquipoDto;
//# sourceMappingURL=equipo.dto.js.map