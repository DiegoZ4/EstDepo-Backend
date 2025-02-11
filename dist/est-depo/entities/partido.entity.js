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
exports.Partido = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const equipo_entity_1 = require("./equipo.entity");
const torneo_entity_1 = require("./torneo.entity");
const category_entity_1 = require("./category.entity");
const goles_entity_1 = require("./goles.entity");
let Partido = class Partido {
    constructor() {
        this.golesLocal = [];
        this.golesVisitante = [];
        this.ganadorId = null;
    }
    calculateGoles() {
        if (this.goles && this.equipoLocal && this.equipoVisitante) {
            this.golesLocal = this.goles.filter((gol) => gol.equipo && gol.equipo.id === this.equipoLocal.id);
            this.golesVisitante = this.goles.filter((gol) => gol.equipo && gol.equipo.id === this.equipoVisitante.id);
        }
    }
    calculateGanador() {
        if (this.golesLocal.length > this.golesVisitante.length) {
            this.ganadorId = this.equipoLocal.id;
        }
        else if (this.golesLocal.length < this.golesVisitante.length) {
            this.ganadorId = this.equipoVisitante.id;
        }
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, fecha: { required: true, type: () => String }, date: { required: true, type: () => Date }, equipoLocal: { required: true, type: () => require("./equipo.entity").Equipo }, equipoVisitante: { required: true, type: () => require("./equipo.entity").Equipo }, goles: { required: true, type: () => [require("./goles.entity").Gol] }, golesLocal: { required: true, type: () => [require("./goles.entity").Gol], default: [] }, golesVisitante: { required: true, type: () => [require("./goles.entity").Gol], default: [] }, ganadorId: { required: true, type: () => Number, nullable: true, default: null }, torneo: { required: true, type: () => require("./torneo.entity").Torneo }, category: { required: true, type: () => require("./category.entity").Category }, estado: { required: true, type: () => String }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
exports.Partido = Partido;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Partido.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Partido.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Partido.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => equipo_entity_1.Equipo, (equipo) => equipo.partidosLocal),
    (0, typeorm_1.JoinColumn)({ name: 'equipo_local_id' }),
    __metadata("design:type", equipo_entity_1.Equipo)
], Partido.prototype, "equipoLocal", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => equipo_entity_1.Equipo, (equipo) => equipo.partidosVisitante),
    (0, typeorm_1.JoinColumn)({ name: 'equipo_visitante_id' }),
    __metadata("design:type", equipo_entity_1.Equipo)
], Partido.prototype, "equipoVisitante", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => goles_entity_1.Gol, (gol) => gol.partido, { cascade: true, eager: true }),
    __metadata("design:type", Array)
], Partido.prototype, "goles", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Partido.prototype, "calculateGoles", null);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Partido.prototype, "calculateGanador", null);
__decorate([
    (0, typeorm_1.ManyToOne)(() => torneo_entity_1.Torneo, (torneo) => torneo.partidos),
    (0, typeorm_1.JoinColumn)({ name: 'torneo_id' }),
    __metadata("design:type", torneo_entity_1.Torneo)
], Partido.prototype, "torneo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, (category) => category.partidos),
    (0, typeorm_1.JoinColumn)({ name: 'categoria_id' }),
    __metadata("design:type", category_entity_1.Category)
], Partido.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        default: 'Pendiente',
    }),
    __metadata("design:type", String)
], Partido.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Partido.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Partido.prototype, "updatedAt", void 0);
exports.Partido = Partido = __decorate([
    (0, typeorm_1.Entity)()
], Partido);
//# sourceMappingURL=partido.entity.js.map