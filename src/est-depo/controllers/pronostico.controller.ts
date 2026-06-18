import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

import { ParseIntPipe } from '../../common/parse-int/parse-int.pipe';
import { JwtAuthGuard } from '../../auth/jwt.auth.guard';
import { PronosticoService } from '../services/pronostico.service';
import { CreatePronosticoDto } from '../dtos/pronostico.dto';

@ApiTags('pronosticos')
@ApiBearerAuth()
@Controller('pronosticos')
export class PronosticoController {
  constructor(private pronosticoService: PronosticoService) {}

  // Crear o cambiar el pronóstico del usuario logueado
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Pronosticar quién va a ganar un partido (crea o actualiza)' })
  create(@Req() req: any, @Body() payload: CreatePronosticoDto) {
    const userId = req.user.sub || req.user.id;
    return this.pronosticoService.upsert(userId, payload);
  }

  // Mis pronósticos
  @UseGuards(JwtAuthGuard)
  @Get('mis')
  @ApiOperation({ summary: 'Listar los pronósticos del usuario logueado' })
  findMine(@Req() req: any) {
    const userId = req.user.sub || req.user.id;
    return this.pronosticoService.findMine(userId);
  }

  // Mi pronóstico para un partido puntual
  @UseGuards(JwtAuthGuard)
  @Get('partido/:id/mio')
  @ApiOperation({ summary: 'Obtener mi pronóstico para un partido' })
  findMineForPartido(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
    const userId = req.user.sub || req.user.id;
    return this.pronosticoService.findMineForPartido(userId, id);
  }

  // Resumen de votos / favorito de un partido (requiere login; quitá el guard si querés que sea público)
  @UseGuards(JwtAuthGuard)
  @Get('partido/:id/resumen')
  @ApiOperation({ summary: 'Ver el conteo de votos y el favorito de un partido' })
  getResumen(@Param('id', ParseIntPipe) id: number) {
    return this.pronosticoService.getResumen(id);
  }

  // Borrar mi pronóstico de un partido
  @UseGuards(JwtAuthGuard)
  @Delete('partido/:id')
  @ApiOperation({ summary: 'Eliminar mi pronóstico de un partido' })
  remove(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
    const userId = req.user.sub || req.user.id;
    return this.pronosticoService.remove(userId, id);
  }
}
