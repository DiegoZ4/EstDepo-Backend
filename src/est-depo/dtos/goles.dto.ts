import { IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateGolDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'The jugador ID' })
  readonly jugadorId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'The partido ID' })
  readonly partidoId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'The equipo ID' })
  readonly equipoId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'The minuto of the gol' })
  readonly minuto: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'The torneo ID' })
  readonly torneoId: number;
}

export class UpdateGolDto extends PartialType(CreateGolDto) { }
