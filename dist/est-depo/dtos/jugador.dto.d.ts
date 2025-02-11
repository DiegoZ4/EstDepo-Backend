export declare class CreateJugadorDto {
    readonly name: string;
    readonly image: string;
    readonly description: string;
    readonly edad: number;
    readonly paisId: number;
    readonly posicion: string;
    readonly goles: number;
    readonly tarjetasRojas: number;
    readonly tarjetasAmarillas: number;
    readonly asistencias: number;
    readonly fechaNacimiento: string;
    readonly altura: number;
    readonly peso: number;
    readonly equipoId: number;
    readonly categoriesId: number;
    readonly partidos: number;
}
declare const UpdateJugadorDto_base: import("@nestjs/common").Type<Partial<CreateJugadorDto>>;
export declare class UpdateJugadorDto extends UpdateJugadorDto_base {
}
export {};
