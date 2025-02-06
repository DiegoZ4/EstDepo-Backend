import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional

} from 'class-validator';

import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreatePaisDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the pais' })
  readonly name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'The image of the pais' })
  readonly image: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'The description of the pais' })
  readonly description: string;


}

export class UpdatePaisDto extends PartialType(CreatePaisDto) { }