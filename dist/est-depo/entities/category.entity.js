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
exports.Category = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const torneo_entity_1 = require("./torneo.entity");
const equipo_entity_1 = require("./equipo.entity");
const jugador_entity_1 = require("./jugador.entity");
const partido_entity_1 = require("./partido.entity");
let Category = class Category {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, torneo: { required: true, type: () => [require("./torneo.entity").Torneo] }, equipos: { required: true, type: () => [require("./equipo.entity").Equipo] }, jugadores: { required: true, type: () => [require("./jugador.entity").Jugador] }, partidos: { required: true, type: () => [require("./partido.entity").Partido] }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
exports.Category = Category;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Category.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => torneo_entity_1.Torneo, (torneo) => torneo.categories, { nullable: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Category.prototype, "torneo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => equipo_entity_1.Equipo, (equipo) => equipo.category),
    __metadata("design:type", Array)
], Category.prototype, "equipos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => jugador_entity_1.Jugador, (jugador) => jugador.category),
    __metadata("design:type", Array)
], Category.prototype, "jugadores", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => partido_entity_1.Partido, (partido) => partido.category),
    __metadata("design:type", Array)
], Category.prototype, "partidos", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Category.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Category.prototype, "updatedAt", void 0);
exports.Category = Category = __decorate([
    (0, typeorm_1.Entity)()
], Category);
//# sourceMappingURL=category.entity.js.map