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
exports.Pais = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const equipo_entity_1 = require("./equipo.entity");
const torneo_entity_1 = require("./torneo.entity");
const jugador_entity_1 = require("./jugador.entity");
let Pais = class Pais {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, image: { required: true, type: () => String }, description: { required: true, type: () => String }, equipos: { required: true, type: () => [require("./equipo.entity").Equipo] }, torneos: { required: true, type: () => [require("./torneo.entity").Torneo] }, jugadores: { required: true, type: () => [require("./jugador.entity").Jugador] }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
exports.Pais = Pais;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Pais.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255
    }),
    __metadata("design:type", String)
], Pais.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Pais.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255
    }),
    __metadata("design:type", String)
], Pais.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => equipo_entity_1.Equipo, (equipo) => equipo.pais),
    __metadata("design:type", Array)
], Pais.prototype, "equipos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => torneo_entity_1.Torneo, (torneo) => torneo.pais),
    __metadata("design:type", Array)
], Pais.prototype, "torneos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => jugador_entity_1.Jugador, (jugador) => jugador.pais),
    __metadata("design:type", Array)
], Pais.prototype, "jugadores", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Pais.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Pais.prototype, "updatedAt", void 0);
exports.Pais = Pais = __decorate([
    (0, typeorm_1.Entity)()
], Pais);
//# sourceMappingURL=pais.entity.js.map