import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { PaisController } from './controllers/pais.controller';
import { EquipoController } from './controllers/equipo.controller';
import { JugadorController } from './controllers/jugador.controller';
import { TorneoController } from './controllers/torneo.controller';
import { PartidoController } from './controllers/partido.controller';
import { PartidoService } from './services/partido.service';
import { TorneoService } from './services/torneo.service';
import { JugadorService } from './services/jugador.service';
import { PaisService } from './services/pais.service';
import { EquipoService } from './services/equipo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipo } from './entities/equipo.entity';
import { Jugador } from './entities/jugador.entity';
import { Pais } from './entities/pais.entity';
import { Torneo } from './entities/torneo.entity';
import { Partido } from './entities/partido.entity';
import { TablaService } from './services/tabla.service';
import { CategoryService } from './services/category.service';
import { CategoryController } from './controllers/category.controller';
import { Category } from './entities/category.entity';
import { Gol } from './entities/goles.entity';
import { GolesController } from './controllers/goles.controller';
import { GolesService } from './services/goles.service';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { User } from './entities/user.entity';
import { UploadController } from './controllers/upload.controller';
import { ImgController } from './controllers/img.controller';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/img',
    }),

    TypeOrmModule.forFeature([
      Equipo,
      User,
      Category,
      Jugador,
      Pais,
      Torneo,
      Partido,
      Gol
    ])],
  controllers: [
    PaisController,
    EquipoController,
    JugadorController,
    TorneoController,
    PartidoController,
    CategoryController,
    GolesController,
    UserController,
    UploadController,
    ImgController,
  ],
  providers: [
    PartidoService,
    TorneoService,
    JugadorService,
    PaisService,
    EquipoService,
    TablaService,
    CategoryService,
    GolesService,
    UserService,
  ],
  exports: [UserService],
})
export class EstDepoModule { }
