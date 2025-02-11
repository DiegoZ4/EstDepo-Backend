export declare class CreatePartidoDto {
    readonly fecha: string;
    readonly date: Date;
    readonly equipoLocalId: number;
    readonly equipoVisitanteId: number;
    readonly goles: number[];
    readonly golesLocal: number;
    readonly golesVisitante: number;
    readonly torneoId: number;
    readonly categoriaId: number;
    readonly estado: string;
    ganador: number;
}
declare const UpdatePartidoDto_base: import("@nestjs/common").Type<Partial<CreatePartidoDto>>;
export declare class UpdatePartidoDto extends UpdatePartidoDto_base {
}
export {};
