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
import { Equipo } from '../entities/equipo.entity';
import { EquipoService } from '../services/equipo.service';
import { CreateEquipoDto, UpdateEquipoDto } from '../dtos/equipo.dto';


@ApiTags('equipos')
@Controller('equipo')
export class EquipoController {
  constructor(private equipoService: EquipoService) { }


  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.equipoService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.equipoService.findOne(id);
  }


  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() payload: CreateEquipoDto) {
    return this.equipoService.create(payload);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateEquipoDto) {
    return this.equipoService.update(id, payload);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.equipoService.remove(id);
  }
}
