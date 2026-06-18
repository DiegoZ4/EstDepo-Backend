import { IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePronosticoDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'ID del partido sobre el que se pronostica' })
  readonly partidoId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'ID del equipo que el usuario cree que va a ganar (local o visitante)' })
  readonly equipoElegidoId: number;
}
