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
exports.Gol = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const partido_entity_1 = require("./partido.entity");
const equipo_entity_1 = require("./equipo.entity");
const torneo_entity_1 = require("./torneo.entity");
const jugador_entity_1 = require("./jugador.entity");
let Gol = class Gol {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, partido: { required: true, type: () => require("./partido.entity").Partido }, equipo: { required: true, type: () => require("./equipo.entity").Equipo }, jugador: { required: true, type: () => require("./jugador.entity").Jugador }, minuto: { required: true, type: () => Number }, torneo: { required: true, type: () => require("./torneo.entity").Torneo }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
exports.Gol = Gol;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Gol.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => partido_entity_1.Partido, (partido) => partido.goles, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'partido_id' }),
    __metadata("design:type", partido_entity_1.Partido)
], Gol.prototype, "partido", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => equipo_entity_1.Equipo, (equipo) => equipo.goles, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'equipo_id' }),
    __metadata("design:type", equipo_entity_1.Equipo)
], Gol.prototype, "equipo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => jugador_entity_1.Jugador, (jugador) => jugador.goles, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'jugador_id' }),
    __metadata("design:type", jugador_entity_1.Jugador)
], Gol.prototype, "jugador", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Gol.prototype, "minuto", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => torneo_entity_1.Torneo, (torneo) => torneo.partidos),
    (0, typeorm_1.JoinColumn)({ name: 'torneo_id' }),
    __metadata("design:type", torneo_entity_1.Torneo)
], Gol.prototype, "torneo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Gol.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Gol.prototype, "updatedAt", void 0);
exports.Gol = Gol = __decorate([
    (0, typeorm_1.Entity)()
], Gol);
//# sourceMappingURL=goles.entity.js.map