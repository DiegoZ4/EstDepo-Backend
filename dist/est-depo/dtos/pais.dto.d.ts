export declare class CreatePaisDto {
    readonly name: string;
    readonly image: string;
    readonly description: string;
}
declare const UpdatePaisDto_base: import("@nestjs/common").Type<Partial<CreatePaisDto>>;
export declare class UpdatePaisDto extends UpdatePaisDto_base {
}
export {};
