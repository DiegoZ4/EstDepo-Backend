import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsIn,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateFaseDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'ID del torneo' })
  readonly torneoId: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'ID de la categoría (null = aplica a todas)', required: false })
  readonly categoriaId?: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Nombre de la fase', example: 'Cuartos de final' })
  readonly nombre: string;

  @IsString()
  @IsIn(['grupos', 'eliminatoria'])
  @ApiProperty({ description: 'Tipo de fase', enum: ['grupos', 'eliminatoria'] })
  readonly tipo: 'grupos' | 'eliminatoria';

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'Orden de disputa: grupos=0, octavos=1, cuartos=2, semi=3, final=4', default: 0, required: false })
  readonly orden?: number;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ description: 'Override por fase del flag idaVuelta del torneo', default: false, required: false })
  readonly idaVuelta?: boolean;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'Solo eliminatoria: 8, 4, 2, 1', required: false })
  readonly cantidadLlaves?: number;
}

export class UpdateFaseDto extends PartialType(CreateFaseDto) {}

// Opciones para generar el bracket automáticamente desde una fase de grupos.
export class GenerarBracketDto {
  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'Override de equiposClasificanPorGrupo del torneo', required: false })
  readonly equiposPorGrupo?: number;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ description: 'Override de idaVueltaEliminatoria del torneo', required: false })
  readonly idaVuelta?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ description: 'Crear también la llave por el tercer puesto', default: false, required: false })
  readonly tercerPuesto?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ description: 'Crear los partidos (ida/vuelta) de la primera ronda', default: true, required: false })
  readonly crearPartidos?: boolean;
}
