"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.equipos1730227109155 = void 0;
class equipos1730227109155 {
    constructor() {
        this.name = 'equipos1730227109155';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "equipo" DROP CONSTRAINT "FK_bc1af67e68f4f3e50e5aa52b95f"`);
        await queryRunner.query(`ALTER TABLE "equipo" DROP COLUMN "torneoId"`);
        await queryRunner.query(`COMMENT ON COLUMN "partido"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "partido"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "torneo"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "torneo"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "pais"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "pais"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "jugador"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "jugador"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "equipo"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "equipo"."updatedAt" IS NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`COMMENT ON COLUMN "equipo"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "equipo"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "jugador"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "jugador"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "pais"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "pais"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "torneo"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "torneo"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "partido"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "partido"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "equipo" ADD "torneoId" integer`);
        await queryRunner.query(`ALTER TABLE "equipo" ADD CONSTRAINT "FK_bc1af67e68f4f3e50e5aa52b95f" FOREIGN KEY ("torneoId") REFERENCES "torneo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.equipos1730227109155 = equipos1730227109155;
//# sourceMappingURL=1730227109155-equipos.js.map