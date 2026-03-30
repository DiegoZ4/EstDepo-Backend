import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt.auth.guard';
import { ParseIntPipe } from '../../common/parse-int/parse-int.pipe';
import { EquipoLibreService } from '../services/equipo-libre.service';
import { CreateEquipoLibreDto } from '../dtos/equipo-libre.dto';

@ApiTags('equipos-libres')
@Controller('equipo-libre')
export class EquipoLibreController {
  constructor(private equipoLibreService: EquipoLibreService) { }

  // GET /equipo-libre/:torneoId/:categoriaId/:fecha → equipos libres en esa fecha
  @Get(':torneoId/:categoriaId/:fecha')
  getLibres(
    @Param('torneoId', ParseIntPipe) torneoId: number,
    @Param('categoriaId', ParseIntPipe) categoriaId: number,
    @Param('fecha', ParseIntPipe) fecha: number,
  ) {
    return this.equipoLibreService.getLibres(torneoId, categoriaId, fecha);
  }

  // GET /equipo-libre/:torneoId/:categoriaId → todos los equipos libres del torneo+categoría
  @Get(':torneoId/:categoriaId')
  getLibresByTorneoYCategoria(
    @Param('torneoId', ParseIntPipe) torneoId: number,
    @Param('categoriaId', ParseIntPipe) categoriaId: number,
  ) {
    return this.equipoLibreService.getLibresByTorneoYCategoria(torneoId, categoriaId);
  }

  // POST /equipo-libre → crear equipo libre
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() payload: CreateEquipoLibreDto) {
    return this.equipoLibreService.create(payload);
  }

  // DELETE /equipo-libre/:id → eliminar por ID
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.equipoLibreService.remove(id);
  }
}
