import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsIn,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateLlaveDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'ID de la fase (eliminatoria)' })
  readonly faseId: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'ID de la categoría', required: false })
  readonly categoriaId?: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Posición en el bracket (1..N)' })
  readonly numero: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'ID del equipo local (null hasta resolver la fase anterior)', required: false })
  readonly equipoLocalId?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'ID del equipo visitante', required: false })
  readonly equipoVisitanteId?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Referencia simbólica del local: "1A", "G-LL1"', required: false })
  readonly origenLocal?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Referencia simbólica del visitante', required: false })
  readonly origenVisitante?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'ID de la llave a la que avanza el ganador', required: false })
  readonly llaveSiguienteId?: number;

  @IsString()
  @IsOptional()
  @IsIn(['local', 'visitante'])
  @ApiProperty({ description: 'Lado en el que cae el ganador en la llave siguiente', enum: ['local', 'visitante'], required: false })
  readonly ladoSiguiente?: 'local' | 'visitante';
}

export class UpdateLlaveDto extends PartialType(CreateLlaveDto) {}

// Cerrar una llave: setea el ganador y lo propaga a la llave siguiente.
export class CerrarLlaveDto {
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description:
      'ID del equipo ganador. Opcional: si no se manda, se deduce del marcador agregado / penales / criterio de desempate del torneo.',
    required: false,
  })
  readonly ganadorEquipoId?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'Crear los partidos de la llave siguiente si ya quedó con los dos equipos', default: true, required: false })
  readonly crearPartidosSiguiente?: boolean;
}
