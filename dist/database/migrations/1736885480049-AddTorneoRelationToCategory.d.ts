import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddTorneoRelationToCategory1736885480049 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
