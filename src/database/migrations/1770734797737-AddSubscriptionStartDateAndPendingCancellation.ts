import {MigrationInterface, QueryRunner} from "typeorm";

export class AddSubscriptionStartDateAndPendingCancellation1770734797737 implements MigrationInterface {
    name = 'AddSubscriptionStartDateAndPendingCancellation1770734797737'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "subscription_start_date" date`);
        await queryRunner.query(`ALTER TABLE "users" ADD "pending_cancellation" boolean NOT NULL DEFAULT false`);
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
        await queryRunner.query(`ALTER TYPE "public"."subscription_status_enum" RENAME TO "users_subscription_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "users_subscription_status_enum" AS ENUM('none', 'active', 'paused', 'cancelled')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "subscription_status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "subscription_status" TYPE "users_subscription_status_enum" USING "subscription_status"::"text"::"users_subscription_status_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "subscription_status" SET DEFAULT 'none'`);
        await queryRunner.query(`DROP TYPE "users_subscription_status_enum_old"`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."subscription_status" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "users"."subscription_status" IS NULL`);
        await queryRunner.query(`CREATE TYPE "users_subscription_status_enum_old" AS ENUM()`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "subscription_status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "subscription_status" TYPE "users_subscription_status_enum_old" USING "subscription_status"::"text"::"users_subscription_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "subscription_status" SET DEFAULT 'none'`);
        await queryRunner.query(`DROP TYPE "users_subscription_status_enum"`);
        await queryRunner.query(`ALTER TYPE "users_subscription_status_enum_old" RENAME TO  "subscription_status_enum"`);
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
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "pending_cancellation"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "subscription_start_date"`);
    }

}
