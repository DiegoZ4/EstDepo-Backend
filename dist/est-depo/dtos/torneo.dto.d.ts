export declare class CreateTorneoDto {
    readonly name: string;
    readonly image: string;
    readonly description: string;
    readonly paisId: number;
    readonly categoriesIds: number[];
    readonly equiposIds: number[];
    readonly partidosIds: number[];
}
declare const UpdateTorneoDto_base: import("@nestjs/common").Type<Partial<CreateTorneoDto>>;
export declare class UpdateTorneoDto extends UpdateTorneoDto_base {
}
export {};
