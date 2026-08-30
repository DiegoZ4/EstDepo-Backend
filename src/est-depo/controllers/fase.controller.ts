import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ParseIntPipe } from '../../common/parse-int/parse-int.pipe';
import { JwtAuthGuard } from '../../auth/jwt.auth.guard';
import { FaseService } from '../services/fase.service';
import { LlaveService } from '../services/llave.service';
import { CreateFaseDto, UpdateFaseDto, GenerarBracketDto } from '../dtos/fase.dto';

@ApiTags('fases')
@Controller('fase')
export class FaseController {
  constructor(
    private faseService: FaseService,
    private llaveService: LlaveService,
  ) {}

  // GET /fase?torneoId=1&categoriaId=2
  @Get()
  getAll(
    @Query('torneoId', ParseIntPipe) torneoId: number,
    @Query('categoriaId') categoriaId?: string,
  ) {
    return this.faseService.findByTorneo(
      torneoId,
      categoriaId !== undefined ? parseInt(categoriaId, 10) : undefined,
    );
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.faseService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() payload: CreateFaseDto) {
    return this.faseService.create(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateFaseDto) {
    return this.faseService.update(id, payload);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.faseService.remove(id);
  }

  // Genera automáticamente el bracket de eliminatoria a partir de esta fase de grupos.
  @UseGuards(JwtAuthGuard)
  @Post(':id/generar-bracket')
  generarBracket(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: GenerarBracketDto,
  ) {
    return this.llaveService.generarBracketDesdeGrupos(id, payload);
  }
}
