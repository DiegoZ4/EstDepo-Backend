import {MigrationInterface, QueryRunner} from "typeorm";

export class goles1737128576593 implements MigrationInterface {
    name = 'goles1737128576593'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "partido" DROP CONSTRAINT "FK_6cca0e31ac582aff01a2d5d17dd"`);
        await queryRunner.query(`CREATE TABLE "gol" ("id" SERIAL NOT NULL, "jugadorId" integer NOT NULL, "minuto" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "partido_id" integer, "equipo_id" integer, "torneo_id" integer, CONSTRAINT "PK_534558f06933029db7f41901c9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "partido" DROP COLUMN "ubicacion"`);
        await queryRunner.query(`ALTER TABLE "partido" DROP COLUMN "golesLocal"`);
        await queryRunner.query(`ALTER TABLE "partido" DROP COLUMN "golesVisitante"`);
        await queryRunner.query(`ALTER TABLE "partido" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "partido" DROP COLUMN "dia"`);
        await queryRunner.query(`ALTER TABLE "partido" ADD "date" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "partido" ADD "categoria_id" integer`);
        await queryRunner.query(`ALTER TABLE "equipo" ADD "torneoId" integer`);
        await queryRunner.query(`COMMENT ON COLUMN "pais"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "pais"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "jugador"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "jugador"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "partido" DROP COLUMN "fecha"`);
        await queryRunner.query(`ALTER TABLE "partido" ADD "fecha" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "partido" ALTER COLUMN "estado" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "partido"."estado" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "partido"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "partido"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "equipo"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "equipo"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "torneo"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "torneo"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "category"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "category"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "partido" ADD CONSTRAINT "FK_6d49caa196ea100d9051597aec9" FOREIGN KEY ("categoria_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "gol" ADD CONSTRAINT "FK_c4401b26a99702df467e07916c5" FOREIGN KEY ("partido_id") REFERENCES "partido"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "gol" ADD CONSTRAINT "FK_116e723c4f1c8e97c9156237fe4" FOREIGN KEY ("equipo_id") REFERENCES "equipo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "gol" ADD CONSTRAINT "FK_5a1c1b799ce09604da8fa110d51" FOREIGN KEY ("torneo_id") REFERENCES "torneo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "equipo" ADD CONSTRAINT "FK_bc1af67e68f4f3e50e5aa52b95f" FOREIGN KEY ("torneoId") REFERENCES "torneo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "equipo" DROP CONSTRAINT "FK_bc1af67e68f4f3e50e5aa52b95f"`);
        await queryRunner.query(`ALTER TABLE "gol" DROP CONSTRAINT "FK_5a1c1b799ce09604da8fa110d51"`);
        await queryRunner.query(`ALTER TABLE "gol" DROP CONSTRAINT "FK_116e723c4f1c8e97c9156237fe4"`);
        await queryRunner.query(`ALTER TABLE "gol" DROP CONSTRAINT "FK_c4401b26a99702df467e07916c5"`);
        await queryRunner.query(`ALTER TABLE "partido" DROP CONSTRAINT "FK_6d49caa196ea100d9051597aec9"`);
        await queryRunner.query(`COMMENT ON COLUMN "category"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "category"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "torneo"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "torneo"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "equipo"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "equipo"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "partido"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "partido"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "partido"."estado" IS NULL`);
        await queryRunner.query(`ALTER TABLE "partido" ALTER COLUMN "estado" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "partido" DROP COLUMN "fecha"`);
        await queryRunner.query(`ALTER TABLE "partido" ADD "fecha" character varying(255) NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "jugador"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "jugador"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "pais"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "pais"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "equipo" DROP COLUMN "torneoId"`);
        await queryRunner.query(`ALTER TABLE "partido" DROP COLUMN "categoria_id"`);
        await queryRunner.query(`ALTER TABLE "partido" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "partido" ADD "dia" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "partido" ADD "categoryId" integer`);
        await queryRunner.query(`ALTER TABLE "partido" ADD "golesVisitante" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "partido" ADD "golesLocal" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "partido" ADD "ubicacion" character varying(255) NOT NULL`);
        await queryRunner.query(`DROP TABLE "gol"`);
        await queryRunner.query(`ALTER TABLE "partido" ADD CONSTRAINT "FK_6cca0e31ac582aff01a2d5d17dd" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
