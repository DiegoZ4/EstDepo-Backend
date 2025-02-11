"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partidos1730228130855 = void 0;
class partidos1730228130855 {
    constructor() {
        this.name = 'partidos1730228130855';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "partido" DROP COLUMN "estado"`);
        await queryRunner.query(`ALTER TABLE "partido" ADD "estado" character varying(255) DEFAULT 'Pendiente'`);
        await queryRunner.query(`COMMENT ON COLUMN "partido"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "partido"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "torneo"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "torneo"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "pais"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "pais"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "jugador"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "jugador"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "equipo" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "equipo" ADD "image" character varying(255)`);
        await queryRunner.query(`COMMENT ON COLUMN "equipo"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "equipo"."updatedAt" IS NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`COMMENT ON COLUMN "equipo"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "equipo"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "equipo" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "equipo" ADD "image" character varying NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "jugador"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "jugador"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "pais"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "pais"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "torneo"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "torneo"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "partido"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "partido"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "partido" DROP COLUMN "estado"`);
        await queryRunner.query(`ALTER TABLE "partido" ADD "estado" character varying NOT NULL DEFAULT 'programado'`);
    }
}
exports.partidos1730228130855 = partidos1730228130855;
//# sourceMappingURL=1730228130855-partidos.js.map