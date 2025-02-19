import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  // Crea un nuevo usuario
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Hashear la contraseña antes de guardarl
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.userRepository.save(newUser);
  }

  // Obtiene todos los usuarios
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  // Obtiene un usuario por su id
  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return user;
  }

  // Actualiza la información de un usuario
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    // Crea una copia de updateUserDto para poder modificarla
    const updatedData = { ...updateUserDto };

    // Si se envía una nueva contraseña, la hasheamos y la asignamos en la copia
    if (updatedData.password) {
      updatedData.password = await bcrypt.hash(updatedData.password, 10);
    }

    const updatedUser = this.userRepository.merge(user, updatedData);
    return this.userRepository.save(updatedUser);
  }

  // Elimina un usuario por su id
  async remove(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
  }
}
