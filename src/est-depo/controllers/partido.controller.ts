import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete
} from '@nestjs/common';

import { ParseIntPipe } from '../../common/parse-int/parse-int.pipe';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { PartidoService } from '../services/partido.service';
import { CreatePartidoDto, UpdatePartidoDto } from '../dtos/partido.dto';


@ApiTags('partidos')
@Controller('partido')
export class PartidoController {
  constructor(private partidoService: PartidoService) { }

  @Get()
  getAll() {
    return this.partidoService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.partidoService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreatePartidoDto) {
    return this.partidoService.create(payload);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdatePartidoDto) {
    return this.partidoService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.partidoService.remove(id);
  }
}
