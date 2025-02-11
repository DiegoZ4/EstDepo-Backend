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
exports.Equipo = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const jugador_entity_1 = require("./jugador.entity");
const goles_entity_1 = require("./goles.entity");
const partido_entity_1 = require("./partido.entity");
const torneo_entity_1 = require("./torneo.entity");
const category_entity_1 = require("./category.entity");
const pais_entity_1 = require("./pais.entity");
let Equipo = class Equipo {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, createdOn: { required: true, type: () => Number }, image: { required: true, type: () => String }, description: { required: true, type: () => String }, category: { required: true, type: () => require("./category.entity").Category }, pais: { required: true, type: () => require("./pais.entity").Pais }, paisId: { required: true, type: () => Number }, partidosLocal: { required: true, type: () => [require("./partido.entity").Partido] }, partidosVisitante: { required: true, type: () => [require("./partido.entity").Partido] }, torneo: { required: true, type: () => require("./torneo.entity").Torneo }, goles: { required: true, type: () => [require("./goles.entity").Gol] }, jugadores: { required: true, type: () => [require("./jugador.entity").Jugador] }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
exports.Equipo = Equipo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Equipo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255
    }),
    __metadata("design:type", String)
], Equipo.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Equipo.prototype, "createdOn", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], Equipo.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255
    }),
    __metadata("design:type", String)
], Equipo.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, (category) => category.equipos),
    __metadata("design:type", category_entity_1.Category)
], Equipo.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pais_entity_1.Pais, (pais) => pais.equipos),
    (0, typeorm_1.JoinColumn)({ name: 'paisId' }),
    __metadata("design:type", pais_entity_1.Pais)
], Equipo.prototype, "pais", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Equipo.prototype, "paisId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => partido_entity_1.Partido, (partido) => partido.equipoLocal, { cascade: true }),
    __metadata("design:type", Array)
], Equipo.prototype, "partidosLocal", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => partido_entity_1.Partido, (partido) => partido.equipoVisitante, { cascade: true }),
    __metadata("design:type", Array)
], Equipo.prototype, "partidosVisitante", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => torneo_entity_1.Torneo, (torneo) => torneo.equipos),
    __metadata("design:type", torneo_entity_1.Torneo)
], Equipo.prototype, "torneo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => goles_entity_1.Gol, (goles) => goles.equipo, { cascade: true }),
    __metadata("design:type", Array)
], Equipo.prototype, "goles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => jugador_entity_1.Jugador, (jugador) => jugador.equipo),
    __metadata("design:type", Array)
], Equipo.prototype, "jugadores", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Equipo.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Equipo.prototype, "updatedAt", void 0);
exports.Equipo = Equipo = __decorate([
    (0, typeorm_1.Entity)()
], Equipo);
//# sourceMappingURL=equipo.entity.js.map