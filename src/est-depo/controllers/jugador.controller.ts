import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query,
  UseGuards
} from '@nestjs/common';

import { ParseIntPipe } from '../../common/parse-int/parse-int.pipe';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt.auth.guard';
import { JugadorService } from '../services/jugador.service';
import { CreateJugadorDto, UpdateJugadorDto } from '../dtos/jugador.dto';
import { Jugador } from '../entities/jugador.entity';
import { BadRequestException } from '@nestjs/common';


@ApiTags('jugadores')
@Controller('jugador')
export class JugadorController {
  constructor(private jugadorService: JugadorService) { }


  @Get()
  async getJugadores(@Query('equipo') equipoId: string) {
    if (equipoId) {
      return this.jugadorService.findByEquipo(parseInt(equipoId));
    } else {
      return this.jugadorService.findAll();
    }
  }


  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.jugadorService.findAll();
  }

  @Get('ranking')
  async getRankingGoleadores(
    @Query('torneoId', ParseIntPipe) torneoId: number,
    @Query('categoriesIds') categoriesIds?: string
  ) {
    // Convertimos la lista de categorías en un arreglo de números
    // si no se envía, será un arreglo vacío
    let categories: number[] = [];
    if (categoriesIds) {
      // categoriesIds vendrá como "1,2,3", lo dividimos en un array
      categories = categoriesIds.split(',').map((idStr) => {
        const id = parseInt(idStr, 10);
        if (isNaN(id)) {
          throw new BadRequestException(`Invalid category ID: ${idStr}`);
        }
        return id;
      });
    }

    return this.jugadorService.getRankingGoleadores(torneoId, categories);
  }



  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.jugadorService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() payload: CreateJugadorDto) {
    return this.jugadorService.create(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateJugadorDto) {
    return this.jugadorService.update(id, payload);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.jugadorService.remove(id);
  }
}
