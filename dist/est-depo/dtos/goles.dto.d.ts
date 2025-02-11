export declare class CreateGolDto {
    readonly jugadorId: number;
    readonly partidoId: number;
    readonly equipoId: number;
    readonly minuto: number;
    readonly torneoId: number;
}
declare const UpdateGolDto_base: import("@nestjs/common").Type<Partial<CreateGolDto>>;
export declare class UpdateGolDto extends UpdateGolDto_base {
}
export {};
