import {MigrationInterface, QueryRunner} from "typeorm";

export class AddTorneoRelationToCategory1736885480049 implements MigrationInterface {
    name = 'AddTorneoRelationToCategory1736885480049'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category_torneo_torneo" ("categoryId" integer NOT NULL, "torneoId" integer NOT NULL, CONSTRAINT "PK_71749a27bd1265e0705e6937cd4" PRIMARY KEY ("categoryId", "torneoId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_856920941c5af9b8b3b5431ca5" ON "category_torneo_torneo" ("categoryId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8def70a5358556b5b14be75c7c" ON "category_torneo_torneo" ("torneoId") `);
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
        await queryRunner.query(`COMMENT ON COLUMN "category"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "category"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "category_torneo_torneo" ADD CONSTRAINT "FK_856920941c5af9b8b3b5431ca59" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category_torneo_torneo" ADD CONSTRAINT "FK_8def70a5358556b5b14be75c7c0" FOREIGN KEY ("torneoId") REFERENCES "torneo"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category_torneo_torneo" DROP CONSTRAINT "FK_8def70a5358556b5b14be75c7c0"`);
        await queryRunner.query(`ALTER TABLE "category_torneo_torneo" DROP CONSTRAINT "FK_856920941c5af9b8b3b5431ca59"`);
        await queryRunner.query(`COMMENT ON COLUMN "category"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "category"."createdAt" IS NULL`);
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
        await queryRunner.query(`DROP INDEX "IDX_8def70a5358556b5b14be75c7c"`);
        await queryRunner.query(`DROP INDEX "IDX_856920941c5af9b8b3b5431ca5"`);
        await queryRunner.query(`DROP TABLE "category_torneo_torneo"`);
    }

}
