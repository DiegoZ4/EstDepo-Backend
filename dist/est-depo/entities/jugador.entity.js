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
exports.Jugador = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const equipo_entity_1 = require("./equipo.entity");
const pais_entity_1 = require("./pais.entity");
const category_entity_1 = require("./category.entity");
const goles_entity_1 = require("./goles.entity");
let Jugador = class Jugador {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, image: { required: true, type: () => String }, edad: { required: true, type: () => Number }, posicion: { required: true, type: () => String }, goles: { required: true, type: () => Number }, asistencias: { required: true, type: () => Number }, fechaNacimiento: { required: true, type: () => Date, nullable: true }, altura: { required: true, type: () => Number }, peso: { required: true, type: () => Number }, tarjetasAmarillas: { required: true, type: () => Number }, tarjetasRojas: { required: true, type: () => Number }, description: { required: true, type: () => String }, gol: { required: true, type: () => require("./goles.entity").Gol }, category: { required: true, type: () => require("./category.entity").Category }, pais: { required: true, type: () => require("./pais.entity").Pais }, equipo: { required: true, type: () => require("./equipo.entity").Equipo }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
exports.Jugador = Jugador;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Jugador.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255
    }),
    __metadata("design:type", String)
], Jugador.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], Jugador.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Jugador.prototype, "edad", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, default: 'Portero' }),
    __metadata("design:type", String)
], Jugador.prototype, "posicion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Jugador.prototype, "goles", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Jugador.prototype, "asistencias", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Jugador.prototype, "fechaNacimiento", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], Jugador.prototype, "altura", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], Jugador.prototype, "peso", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Jugador.prototype, "tarjetasAmarillas", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Jugador.prototype, "tarjetasRojas", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: true
    }),
    __metadata("design:type", String)
], Jugador.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => goles_entity_1.Gol, (gol) => gol.jugador),
    __metadata("design:type", goles_entity_1.Gol)
], Jugador.prototype, "gol", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, (category) => category.jugadores, { eager: true }),
    __metadata("design:type", category_entity_1.Category)
], Jugador.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pais_entity_1.Pais, (pais) => pais.jugadores, { eager: true }),
    __metadata("design:type", pais_entity_1.Pais)
], Jugador.prototype, "pais", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => equipo_entity_1.Equipo, (equipo) => equipo.jugadores, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'equipoId' }),
    __metadata("design:type", equipo_entity_1.Equipo)
], Jugador.prototype, "equipo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Jugador.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Jugador.prototype, "updatedAt", void 0);
exports.Jugador = Jugador = __decorate([
    (0, typeorm_1.Entity)()
], Jugador);
//# sourceMappingURL=jugador.entity.js.map