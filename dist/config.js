"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)("config", () => {
    return {
        database: {
            databaseName: process.env.DATABASE_NAME,
            port: parseInt(process.env.PORT),
        },
        postgres: {
            dbName: process.env.POSTGRES_DB,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            port: parseInt(process.env.POSTGRES_PORT, 10),
            host: process.env.POSTGRES_HOST,
        },
        apiKey: process.env.API_KEY,
    };
});
//# sourceMappingURL=config.js.map