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

import { ParseIntPipe } from '../../common/parse-int/parse-int.pipe';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt.auth.guard';
import { PartidoService } from '../services/partido.service';
import { CreatePartidoDto, UpdatePartidoDto } from '../dtos/partido.dto';


@ApiTags('partidos')
@Controller('partido')
export class PartidoController {
  constructor(private partidoService: PartidoService) { }


  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.partidoService.findAll();
  }

  @Get('/:torneoId/fixture/:categoriaId/:fecha')
  getFixtureByCategory(
    @Param('torneoId', ParseIntPipe) torneoId: number,
    @Param('categoriaId', ParseIntPipe) categoriaId: number,
    @Param('fecha', ParseIntPipe) fecha: number
  ) {
    return this.partidoService.getFixtureByCategory(torneoId, categoriaId, fecha);
  }


  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.partidoService.findOne(id);
  }


  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() payload: CreatePartidoDto) {
    return this.partidoService.create(payload);
  }


  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdatePartidoDto) {
    return this.partidoService.update(id, payload);
  }


  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.partidoService.remove(id);
  }
}
