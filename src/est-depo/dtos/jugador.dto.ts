import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,

} from 'class-validator';

import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateJugadorDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the jugador' })
  readonly name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'The image of the jugador' })
  readonly image: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'The description of the jugador' })
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'The edad of the jugador' })
  readonly edad: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'The ID of the nacionalidad (Pais)' })
  readonly paisId: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'The posicion of the jugador' })
  readonly posicion: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'The goles of the jugador' })
  readonly goles: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'The tarjetas of the jugador' })
  readonly tarjetasRojas: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'The tarjetasAmarillas of the jugador' })
  readonly tarjetasAmarillas: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'The asistencias of the jugador' })
  readonly asistencias: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'The fechaNacimiento of the jugador' })
  readonly fechaNacimiento: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'The altura of the jugador' })
  readonly altura: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'The peso of the jugador' })
  readonly peso: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'The ID of the equipo' })
  readonly equipoId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'The ID of the category' })
  readonly categoriesId: number;



  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'The club of the jugador' })
  readonly partidos: number;


}

export class UpdateJugadorDto extends PartialType(CreateJugadorDto) { }