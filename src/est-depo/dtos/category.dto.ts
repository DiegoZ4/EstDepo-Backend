import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the category' })
  readonly name: string;

  @IsNumber({}, { each: true })
  @IsOptional()
  @ApiProperty({ description: 'The ID of the torneo to which the category belongs' })
  readonly torneoId: number;

  @IsNumber({}, { each: true })
  @IsOptional()
  @ApiProperty({
    description: 'Array of IDs for equipos associated with this category',
    isArray: true,
  })
  readonly equiposIds?: number[];

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description: 'Array of IDs for jugadores associated with this category',
    isArray: true,
  })
  readonly jugadoresIds?: number[];

  @IsNumber({}, { each: true })
  @IsOptional()
  @ApiProperty({
    description: 'Array of IDs for partidos associated with this category',
    isArray: true,
  })
  readonly partidosIds?: number[];
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) { }
