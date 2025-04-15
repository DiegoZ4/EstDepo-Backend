import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt.auth.guard';
import { ParseIntPipe } from '../../common/parse-int/parse-int.pipe';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { TorneoService } from '../services/torneo.service';
import { CreateTorneoDto, UpdateTorneoDto } from '../dtos/torneo.dto';


@ApiTags('torneoes')
@Controller('torneo')
export class TorneoController {
  constructor(private torneoService: TorneoService) { }

  @Get()
  getAll() {
    return this.torneoService.findAll();
  }
  @Get('/tabla-general')
  async getTablaGeneral() {
    return this.torneoService.getTablaGeneral();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/agrupados/:id')
  async getTorneoConPartidosAgrupados(@Param('id', ParseIntPipe) id: number) {
    return this.torneoService.getTorneoConPartidosAgrupados(id);
  }


  @UseGuards(JwtAuthGuard)
  @Get(':id/categorias')
  async getCategoriasDelTorneo(@Param('id', ParseIntPipe) id: number) {
    return this.torneoService.getCategoriasDelTorneo(id);
  }



  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.torneoService.findOne(id);
  }


  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() payload: CreateTorneoDto) {
    return this.torneoService.create(payload);
  }

  @Get(':torneoId/tabla/:categoriaId')
  async getTablaPorCategoriaAgrupada(
    @Param('torneoId', ParseIntPipe) torneoId: number,
    @Param('categoriaId', ParseIntPipe) categoriaId: number,
  ) {
    return this.torneoService.getTablaPorCategoriaAgrupada(torneoId, categoriaId);
  }


  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateTorneoDto) {
    return this.torneoService.update(id, payload);
  }


  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.torneoService.remove(id);
  }
}
