export declare class CreateEquipoDto {
    readonly name: string;
    readonly createdOn: number;
    readonly image: string;
    readonly description: string;
    readonly paisId: number;
}
declare const UpdateEquipoDto_base: import("@nestjs/common").Type<Partial<CreateEquipoDto>>;
export declare class UpdateEquipoDto extends UpdateEquipoDto_base {
}
export {};
