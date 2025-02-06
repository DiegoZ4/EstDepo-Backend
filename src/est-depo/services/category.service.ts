import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import { Torneo } from '../entities/torneo.entity';
import { Equipo } from '../entities/equipo.entity';
import { Jugador } from '../entities/jugador.entity';
import { Partido } from '../entities/partido.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    @InjectRepository(Torneo)
    private torneoRepository: Repository<Torneo>,

    @InjectRepository(Equipo)
    private equipoRepository: Repository<Equipo>,

    @InjectRepository(Jugador)
    private jugadorRepository: Repository<Jugador>,

    @InjectRepository(Partido)
    private partidoRepository: Repository<Partido>,
  ) { }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find({
      relations: ['torneo', 'equipos', 'jugadores', 'partidos'],
    });
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['torneo', 'equipos', 'jugadores', 'partidos'],
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const { torneoId, equiposIds, jugadoresIds, partidosIds, ...data } = createCategoryDto;

    const equipos = equiposIds ? await this.equipoRepository.find({ where: { id: In(equiposIds) } }) : [];
    const jugadores = jugadoresIds ? await this.jugadorRepository.find({ where: { id: In(jugadoresIds) } }) : [];
    const partidos = partidosIds ? await this.partidoRepository.find({ where: { id: In(partidosIds) } }) : [];

    const torneo = await this.torneoRepository.findOne(torneoId);


    const newCategory = this.categoryRepository.create({
      ...data,
      torneo: [torneo],
      equipos,
      jugadores,
      partidos,
    });

    return this.categoryRepository.save(newCategory);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findOne(id);

    const { torneoId, equiposIds, jugadoresIds, partidosIds, ...data } = updateCategoryDto;

    if (torneoId) {
      const torneo = await this.torneoRepository.findOne(torneoId);
      if (!torneo) {
        throw new NotFoundException(`Torneo with ID ${torneoId} not found`);
      }
      category.torneo = [torneo];
    }

    if (equiposIds) {
      const equipos = await this.equipoRepository.find({ where: { id: In(equiposIds) } });
      category.equipos = equipos;
    }

    if (jugadoresIds) {
      const jugadores = await this.jugadorRepository.find({ where: { id: In(jugadoresIds) } });
      category.jugadores = jugadores;
    }

    if (partidosIds) {
      const partidos = await this.partidoRepository.find({ where: { id: In(partidosIds) } });
      category.partidos = partidos;
    }

    this.categoryRepository.merge(category, data);
    return this.categoryRepository.save(category);
  }

  async delete(id: number): Promise<void> {
    const category = await this.findOne(id);
    await this.categoryRepository.remove(category);
  }
}
