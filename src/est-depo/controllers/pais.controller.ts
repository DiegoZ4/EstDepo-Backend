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
import { PaisService } from '../services/pais.service';
import { CreatePaisDto, UpdatePaisDto } from '../dtos/pais.dto';


@ApiTags('paises')
@Controller('pais')
export class PaisController {
  constructor(private paisService: PaisService) { }


  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.paisService.findAll();
  }


  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.paisService.findOne(id);
  }


  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() payload: CreatePaisDto) {
    return this.paisService.create(payload);
  }


  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdatePaisDto) {
    return this.paisService.update(id, payload);
  }


  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.paisService.remove(id);
  }
}
