"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newgoles1737467922718 = void 0;
class newgoles1737467922718 {
    constructor() {
        this.name = 'newgoles1737467922718';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "gol" DROP CONSTRAINT "FK_c4401b26a99702df467e07916c5"`);
        await queryRunner.query(`ALTER TABLE "gol" DROP COLUMN "esLocal"`);
        await queryRunner.query(`COMMENT ON COLUMN "pais"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "pais"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "partido"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "partido"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "gol"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "gol"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "jugador"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "jugador"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "equipo"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "equipo"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "torneo"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "torneo"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "category"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "category"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "gol" ADD CONSTRAINT "FK_c4401b26a99702df467e07916c5" FOREIGN KEY ("partido_id") REFERENCES "partido"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "gol" DROP CONSTRAINT "FK_c4401b26a99702df467e07916c5"`);
        await queryRunner.query(`COMMENT ON COLUMN "category"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "category"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "torneo"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "torneo"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "equipo"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "equipo"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "jugador"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "jugador"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "gol"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "gol"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "partido"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "partido"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "pais"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "pais"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "gol" ADD "esLocal" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "gol" ADD CONSTRAINT "FK_c4401b26a99702df467e07916c5" FOREIGN KEY ("partido_id") REFERENCES "partido"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
}
exports.newgoles1737467922718 = newgoles1737467922718;
//# sourceMappingURL=1737467922718-newgoles.js.map