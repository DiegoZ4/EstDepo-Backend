import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDate, IsArray } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Equipo } from '../entities/equipo.entity';


export class CreatePartidoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The fecha of the partido' })
  readonly fecha: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({ description: 'The date of the partido' })
  readonly date: Date;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'The equipo local ID' })
  readonly equipoLocalId: number;


  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Grupo Local (para partidos interzonales)', required: false })
  readonly groupLocal?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Grupo Visitante (para partidos interzonales)', required: false })
  readonly groupVisitante?: string;


  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'The equipo visitante ID' })
  readonly equipoVisitanteId: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'The group of the partido' })
  readonly group?: string;

  @IsOptional()
  @IsArray()
  @ApiProperty({ description: 'The goles of the partido' })
  readonly goles: number[];

  @ApiProperty({ description: 'The number of goals scored by the local team' })
  readonly golesLocal: number;

  @ApiProperty({ description: 'The number of goals scored by the visiting team' })
  readonly golesVisitante: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'The torneo ID' })
  readonly torneoId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'The categoria ID' })
  readonly categoriaId: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The estado of the partido',
    default: 'Pendiente',
    enum: ['Pendiente', 'Finalizado'], // Solo permite estos valores
  })
  readonly estado: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'The ganador of the partido' })
  ganador: number;

}

export class UpdatePartidoDto extends PartialType(CreatePartidoDto) { }
