import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCategoryEntity1736869349126 implements MigrationInterface {
    name = 'AddCategoryEntity1736869349126'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "torneoId" integer, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "jugador" ADD "categoryId" integer`);
        await queryRunner.query(`ALTER TABLE "equipo" ADD "categoryId" integer`);
        await queryRunner.query(`ALTER TABLE "partido" ADD "categoryId" integer`);
        await queryRunner.query(`COMMENT ON COLUMN "pais"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "pais"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "jugador"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "jugador"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "equipo"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "equipo"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "partido"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "partido"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "torneo"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "torneo"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "jugador" ADD CONSTRAINT "FK_34c7cf876716aab4ec8c73449fc" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "equipo" ADD CONSTRAINT "FK_b378a5a7bf2688d740b8480ed93" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "partido" ADD CONSTRAINT "FK_6cca0e31ac582aff01a2d5d17dd" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_bc46ece019a59318bf23f4c6e2e" FOREIGN KEY ("torneoId") REFERENCES "torneo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_bc46ece019a59318bf23f4c6e2e"`);
        await queryRunner.query(`ALTER TABLE "partido" DROP CONSTRAINT "FK_6cca0e31ac582aff01a2d5d17dd"`);
        await queryRunner.query(`ALTER TABLE "equipo" DROP CONSTRAINT "FK_b378a5a7bf2688d740b8480ed93"`);
        await queryRunner.query(`ALTER TABLE "jugador" DROP CONSTRAINT "FK_34c7cf876716aab4ec8c73449fc"`);
        await queryRunner.query(`COMMENT ON COLUMN "torneo"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "torneo"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "partido"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "partido"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "equipo"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "equipo"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "jugador"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "jugador"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "pais"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "pais"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "partido" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "equipo" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "jugador" DROP COLUMN "categoryId"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
