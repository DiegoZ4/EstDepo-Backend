import {MigrationInterface, QueryRunner} from "typeorm";

export class equiposData1737988645509 implements MigrationInterface {
    name = 'equiposData1737988645509'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "equipo" ADD "Pts" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "equipo" ADD "PJ" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "equipo" ADD "PG" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "equipo" ADD "PE" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "equipo" ADD "PP" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "equipo" ADD "GF" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "equipo" ADD "GC" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "equipo" ADD "DIF" integer NOT NULL DEFAULT '0'`);
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
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
        await queryRunner.query(`ALTER TABLE "equipo" DROP COLUMN "DIF"`);
        await queryRunner.query(`ALTER TABLE "equipo" DROP COLUMN "GC"`);
        await queryRunner.query(`ALTER TABLE "equipo" DROP COLUMN "GF"`);
        await queryRunner.query(`ALTER TABLE "equipo" DROP COLUMN "PP"`);
        await queryRunner.query(`ALTER TABLE "equipo" DROP COLUMN "PE"`);
        await queryRunner.query(`ALTER TABLE "equipo" DROP COLUMN "PG"`);
        await queryRunner.query(`ALTER TABLE "equipo" DROP COLUMN "PJ"`);
        await queryRunner.query(`ALTER TABLE "equipo" DROP COLUMN "Pts"`);
    }

}
