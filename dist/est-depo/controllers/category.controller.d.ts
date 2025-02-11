import { CategoryService } from '../services/category.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    findAll(): Promise<import("../entities/category.entity").Category[]>;
    findOne(id: number): Promise<import("../entities/category.entity").Category>;
    create(createCategoryDto: CreateCategoryDto): Promise<import("../entities/category.entity").Category>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<import("../entities/category.entity").Category>;
    delete(id: number): Promise<void>;
}
