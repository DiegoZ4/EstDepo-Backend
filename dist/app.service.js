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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("./config");
const pg_1 = require("pg");
let AppService = class AppService {
    constructor(tasks, configService, clientPg) {
        this.tasks = tasks;
        this.configService = configService;
        this.clientPg = clientPg;
    }
    getHello() {
        const apiKey = this.configService.apiKey;
        const name = this.configService.database.databaseName;
        return `Hello world ${apiKey} y estas en ${name} con el apikey ${apiKey}`;
    }
    getTasks() {
        return new Promise((resolve, reject) => {
            this.clientPg.query('SELECT * FROM tasks', (err, res) => {
                if (err) {
                    console.error('Error en la consulta:', err);
                    reject(err);
                }
                else {
                    console.log('Resultado de la consulta:', res);
                    resolve(res?.rows);
                }
            });
        });
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('TASKS')),
    __param(1, (0, common_1.Inject)(config_1.default.KEY)),
    __param(2, (0, common_1.Inject)('PG')),
    __metadata("design:paramtypes", [Array, void 0, pg_1.Client])
], AppService);
//# sourceMappingURL=app.service.js.map