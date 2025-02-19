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

  @UseGuards(JwtAuthGuard)
  @Get('Goleadores')
  getRankingGoleadores() {
    return this.jugadorService.getRankingGoleadores();
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
