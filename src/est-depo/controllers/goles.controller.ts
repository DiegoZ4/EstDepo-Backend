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
import { GolesService } from '../services/goles.service';
import { CreateGolDto, UpdateGolDto } from '../dtos/goles.dto';


@ApiTags('goless')
@Controller('goles')
export class GolesController {
  constructor(private golesService: GolesService) { }


  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.golesService.findAll();
  }


  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.golesService.findOne(id);
  }


  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() payload: CreateGolDto) {
    return this.golesService.create(payload);
  }


  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateGolDto) {
    return this.golesService.update(id, payload);
  }


  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.golesService.remove(id);
  }
}
