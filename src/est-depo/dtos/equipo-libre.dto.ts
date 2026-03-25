import { IsNotEmpty, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateEquipoLibreDto {
  @IsNotEmpty()
  @IsNumber()
  equipoId: number;

  @IsNotEmpty()
  @IsNumber()
  torneoId: number;

  @IsNotEmpty()
  @IsNumber()
  categoriaId: number;

  @IsNotEmpty()
  @IsNumber()
  fecha: number;
}

export class UpdateEquipoLibreDto extends PartialType(CreateEquipoLibreDto) {}
