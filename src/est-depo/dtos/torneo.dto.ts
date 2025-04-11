import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsArray

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
  @ApiProperty({ description: 'fechas del torneo' })
  readonly fechas: number;

}

export class UpdateTorneoDto extends PartialType(CreateTorneoDto) { } 