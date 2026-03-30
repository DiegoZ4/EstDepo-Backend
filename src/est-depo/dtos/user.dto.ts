import { IsEmail, IsNotEmpty, IsOptional, IsEnum, IsString, IsDate, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/swagger';

export enum UserRole {
  FREE_USER = 'freeUser',
  SUBS_USER = 'SubsUser',
  SUBS_USER_MANUAL = 'SubsUserManual',
  PERIODISTA = 'periodista',
  ADMIN = 'admin',
}

// Roles que NO deben ser modificados por la sincronización automática con Mercado Pago
export const PROTECTED_ROLES: UserRole[] = [
  UserRole.SUBS_USER_MANUAL,
  UserRole.PERIODISTA,
  UserRole.ADMIN,
];

export class CreateUserDto {
  @IsNotEmpty({ message: 'El email es obligatorio' })
  @IsEmail({}, { message: 'Debe ser un email válido' })
  readonly email: string;

  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  readonly name: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  readonly password: string;

  @IsNotEmpty({ message: 'El rol es obligatorio' })
  @IsEnum(UserRole, { message: 'El rol debe ser freeUser, SubsUser, SubsUserManual, periodista o admin' })
  readonly rol: UserRole;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'La fecha de nacimiento debe ser una fecha válida' })
  readonly bornDate?: Date;
}
export class UpdateUserDto extends PartialType(CreateUserDto) { }