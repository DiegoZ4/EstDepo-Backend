declare const _default: (() => {
    database: {
        databaseName: string;
        port: number;
    };
    postgres: {
        dbName: string;
        user: string;
        password: string;
        port: number;
        host: string;
    };
    apiKey: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    database: {
        databaseName: string;
        port: number;
    };
    postgres: {
        dbName: string;
        user: string;
        password: string;
        port: number;
        host: string;
    };
    apiKey: string;
}>;
export default _default;
