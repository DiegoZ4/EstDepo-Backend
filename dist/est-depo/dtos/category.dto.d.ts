export declare class CreateCategoryDto {
    readonly name: string;
    readonly torneoId: number;
    readonly equiposIds?: number[];
    readonly jugadoresIds?: number[];
    readonly partidosIds?: number[];
}
declare const UpdateCategoryDto_base: import("@nestjs/common").Type<Partial<CreateCategoryDto>>;
export declare class UpdateCategoryDto extends UpdateCategoryDto_base {
}
export {};
