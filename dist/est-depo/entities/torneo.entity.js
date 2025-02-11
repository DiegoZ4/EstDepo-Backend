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
exports.Torneo = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const equipo_entity_1 = require("./equipo.entity");
const category_entity_1 = require("./category.entity");
const partido_entity_1 = require("./partido.entity");
const pais_entity_1 = require("./pais.entity");
let Torneo = class Torneo {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, image: { required: true, type: () => String }, description: { required: true, type: () => String }, partidos: { required: true, type: () => [require("./partido.entity").Partido] }, pais: { required: true, type: () => require("./pais.entity").Pais }, equipos: { required: true, type: () => [require("./equipo.entity").Equipo] }, categories: { required: true, type: () => [require("./category.entity").Category] }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
exports.Torneo = Torneo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int' }),
    __metadata("design:type", Number)
], Torneo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255
    }),
    __metadata("design:type", String)
], Torneo.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Torneo.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255
    }),
    __metadata("design:type", String)
], Torneo.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => partido_entity_1.Partido, (partido) => partido.torneo),
    __metadata("design:type", Array)
], Torneo.prototype, "partidos", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pais_entity_1.Pais, (pais) => pais.torneos),
    __metadata("design:type", pais_entity_1.Pais)
], Torneo.prototype, "pais", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => equipo_entity_1.Equipo, (equipo) => equipo.torneo),
    __metadata("design:type", Array)
], Torneo.prototype, "equipos", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => category_entity_1.Category, (category) => category.torneo, { nullable: true }),
    __metadata("design:type", Array)
], Torneo.prototype, "categories", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Torneo.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Torneo.prototype, "updatedAt", void 0);
exports.Torneo = Torneo = __decorate([
    (0, typeorm_1.Entity)()
], Torneo);
//# sourceMappingURL=torneo.entity.js.map