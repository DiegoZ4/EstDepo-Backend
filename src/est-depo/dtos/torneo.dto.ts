import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsArray,
  IsBoolean,
  IsIn

} from 'class-validator';

import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateTorneoDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the torneo' })
  readonly name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'The image of the torneo' })
  readonly image: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'The description of the torneo' })
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'The id of the pais' })
  readonly paisId: number;

  @IsArray()
  @IsOptional()
  @ApiProperty({ description: 'Array of groups for the torneo', type: [String] })
  readonly groups?: string[];


  @IsArray()
  @IsOptional()
  @ApiProperty({ description: 'The categoriesIds of the torneo' })
  readonly categoriesIds: number[];

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'The equiposIds of the torneo' })
  readonly equiposIds: number[];

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'The partidosIds of the torneo' })
  readonly partidosIds: number[];

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'fechas del torneo (en copa: fechas de la fase de grupos)' })
  readonly fechas: number;

  // ── Formato ──────────────────────────────────────────────────────
  @IsString()
  @IsOptional()
  @IsIn(['liga', 'copa'])
  @ApiProperty({ description: 'Formato del torneo', enum: ['liga', 'copa'], default: 'liga', required: false })
  readonly formato?: 'liga' | 'copa';

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ description: 'Solo copa. false => eliminatoria directa', default: true, required: false })
  readonly tieneFaseGrupos?: boolean;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'Cuántos equipos de cada grupo clasifican a la eliminatoria', default: 2, required: false })
  readonly equiposClasificanPorGrupo?: number;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ description: 'Llaves de eliminatoria a ida y vuelta', default: false, required: false })
  readonly idaVueltaEliminatoria?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ description: 'Fase de grupos a doble rueda', default: false, required: false })
  readonly idaVueltaGrupos?: boolean;

  @IsString()
  @IsOptional()
  @IsIn(['penales', 'prorroga', 'gol_visitante', 'mejor_posicionado'])
  @ApiProperty({
    description: 'Cómo se resuelve una llave empatada',
    enum: ['penales', 'prorroga', 'gol_visitante', 'mejor_posicionado'],
    default: 'penales',
    required: false,
  })
  readonly criterioDesempateLlave?: 'penales' | 'prorroga' | 'gol_visitante' | 'mejor_posicionado';

}

export class UpdateTorneoDto extends PartialType(CreateTorneoDto) { } 