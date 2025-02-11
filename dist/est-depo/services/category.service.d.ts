import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import { Torneo } from '../entities/torneo.entity';
import { Equipo } from '../entities/equipo.entity';
import { Jugador } from '../entities/jugador.entity';
import { Partido } from '../entities/partido.entity';
export declare class CategoryService {
    private categoryRepository;
    private torneoRepository;
    private equipoRepository;
    private jugadorRepository;
    private partidoRepository;
    constructor(categoryRepository: Repository<Category>, torneoRepository: Repository<Torneo>, equipoRepository: Repository<Equipo>, jugadorRepository: Repository<Jugador>, partidoRepository: Repository<Partido>);
    findAll(): Promise<Category[]>;
    findOne(id: number): Promise<Category>;
    create(createCategoryDto: CreateCategoryDto): Promise<Category>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category>;
    delete(id: number): Promise<void>;
}
