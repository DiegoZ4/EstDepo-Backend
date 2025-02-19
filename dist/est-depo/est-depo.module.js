"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstDepoModule = void 0;
const common_1 = require("@nestjs/common");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const pais_controller_1 = require("./controllers/pais.controller");
const equipo_controller_1 = require("./controllers/equipo.controller");
const jugador_controller_1 = require("./controllers/jugador.controller");
const torneo_controller_1 = require("./controllers/torneo.controller");
const partido_controller_1 = require("./controllers/partido.controller");
const partido_service_1 = require("./services/partido.service");
const torneo_service_1 = require("./services/torneo.service");
const jugador_service_1 = require("./services/jugador.service");
const pais_service_1 = require("./services/pais.service");
const equipo_service_1 = require("./services/equipo.service");
const typeorm_1 = require("@nestjs/typeorm");
const equipo_entity_1 = require("./entities/equipo.entity");
const jugador_entity_1 = require("./entities/jugador.entity");
const pais_entity_1 = require("./entities/pais.entity");
const torneo_entity_1 = require("./entities/torneo.entity");
const partido_entity_1 = require("./entities/partido.entity");
const tabla_service_1 = require("./services/tabla.service");
const category_service_1 = require("./services/category.service");
const category_controller_1 = require("./controllers/category.controller");
const category_entity_1 = require("./entities/category.entity");
const goles_entity_1 = require("./entities/goles.entity");
const goles_controller_1 = require("./controllers/goles.controller");
const goles_service_1 = require("./services/goles.service");
const user_controller_1 = require("./controllers/user.controller");
const user_service_1 = require("./services/user.service");
const user_entity_1 = require("./entities/user.entity");
const upload_controller_1 = require("./controllers/upload.controller");
const img_controller_1 = require("./controllers/img.controller");
let EstDepoModule = class EstDepoModule {
};
exports.EstDepoModule = EstDepoModule;
exports.EstDepoModule = EstDepoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(process.cwd(), 'uploads'),
                serveRoot: '/img',
            }),
            typeorm_1.TypeOrmModule.forFeature([
                equipo_entity_1.Equipo,
                user_entity_1.User,
                category_entity_1.Category,
                jugador_entity_1.Jugador,
                pais_entity_1.Pais,
                torneo_entity_1.Torneo,
                partido_entity_1.Partido,
                goles_entity_1.Gol
            ])
        ],
        controllers: [
            pais_controller_1.PaisController,
            equipo_controller_1.EquipoController,
            jugador_controller_1.JugadorController,
            torneo_controller_1.TorneoController,
            partido_controller_1.PartidoController,
            category_controller_1.CategoryController,
            goles_controller_1.GolesController,
            user_controller_1.UserController,
            upload_controller_1.UploadController,
            img_controller_1.ImgController,
        ],
        providers: [
            partido_service_1.PartidoService,
            torneo_service_1.TorneoService,
            jugador_service_1.JugadorService,
            pais_service_1.PaisService,
            equipo_service_1.EquipoService,
            tabla_service_1.TablaService,
            category_service_1.CategoryService,
            goles_service_1.GolesService,
            user_service_1.UserService,
        ],
        exports: [user_service_1.UserService],
    })
], EstDepoModule);
//# sourceMappingURL=est-depo.module.js.map