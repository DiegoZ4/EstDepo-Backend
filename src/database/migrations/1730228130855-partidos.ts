import {MigrationInterface, QueryRunner} from "typeorm";

export class partidos1730228130855 implements MigrationInterface {
    name = 'partidos1730228130855'

    public async up(queryRunner: QueryRunner): Promise<void> {
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

    public async down(queryRunner: QueryRunner): Promise<void> {
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
