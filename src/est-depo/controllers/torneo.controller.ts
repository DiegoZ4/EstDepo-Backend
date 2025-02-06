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


  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.torneoService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateTorneoDto) {
    return this.torneoService.create(payload);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateTorneoDto) {
    return this.torneoService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.torneoService.remove(id);
  }
}
