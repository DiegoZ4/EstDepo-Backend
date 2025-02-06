import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min
} from 'class-validator';

import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateEquipoDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the equipo' })
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'fecha de creacion de un club' })
  readonly createdOn: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'The image of the equipo' })
  readonly image: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'The description of the equipo' })
  readonly description: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'The id of the pais' })
  readonly paisId: number;

}

export class UpdateEquipoDto extends PartialType(CreateEquipoDto) { }