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
import { LlaveService } from '../services/llave.service';
import { CreateLlaveDto, UpdateLlaveDto, CerrarLlaveDto } from '../dtos/llave.dto';

@ApiTags('llaves')
@Controller('llave')
export class LlaveController {
  constructor(private llaveService: LlaveService) {}

  // GET /llave/bracket?torneoId=1&categoriaId=2  -> fases de eliminatoria + llaves
  @Get('bracket')
  getBracket(
    @Query('torneoId', ParseIntPipe) torneoId: number,
    @Query('categoriaId') categoriaId?: string,
  ) {
    return this.llaveService.getBracket(
      torneoId,
      categoriaId !== undefined ? parseInt(categoriaId, 10) : undefined,
    );
  }

  // GET /llave/fase/5  -> llaves de una fase
  @Get('fase/:faseId')
  getByFase(@Param('faseId', ParseIntPipe) faseId: number) {
    return this.llaveService.findByFase(faseId);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.llaveService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() payload: CreateLlaveDto) {
    return this.llaveService.create(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateLlaveDto) {
    return this.llaveService.update(id, payload);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.llaveService.remove(id);
  }

  // Cierra la llave: setea el ganador (deducido o manual) y lo propaga a la siguiente.
  @UseGuards(JwtAuthGuard)
  @Post(':id/cerrar')
  cerrar(@Param('id', ParseIntPipe) id: number, @Body() payload: CerrarLlaveDto) {
    return this.llaveService.cerrarLlave(id, payload);
  }
}
