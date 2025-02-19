import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) { }

  // Endpoint para crear un nuevo usuario
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // Endpoint para obtener todos los usuarios
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  // Endpoint para obtener un usuario por su id
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // Endpoint para actualizar un usuario
  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  // Endpoint para eliminar un usuario
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
