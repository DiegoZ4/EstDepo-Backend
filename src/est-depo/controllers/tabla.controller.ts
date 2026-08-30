import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ParseIntPipe } from '../../common/parse-int/parse-int.pipe';
import { TablaService } from '../services/tabla.service';

@ApiTags('Tabla')
@Controller('tabla')
export class TablaController {
  constructor(private readonly tablaService: TablaService) {}

  // GET /tabla?torneoId=1&categoriaId=2&faseId=5
  // faseId opcional: si se omite, calcula la tabla de la liga clásica (partidos sin fase).
  @Get()
  getTabla(
    @Query('torneoId', ParseIntPipe) torneoId: number,
    @Query('categoriaId', ParseIntPipe) categoriaId: number,
    @Query('faseId') faseId?: string,
  ) {
    return this.tablaService.getTablaFaseGrupos(
      torneoId,
      categoriaId,
      faseId !== undefined ? parseInt(faseId, 10) : null,
    );
  }
}
