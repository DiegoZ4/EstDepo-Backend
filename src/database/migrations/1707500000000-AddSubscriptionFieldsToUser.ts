import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddSubscriptionFieldsToUser1707500000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Crear el tipo ENUM para subscription_status
    await queryRunner.query(`
      CREATE TYPE "subscription_status_enum" AS ENUM ('none', 'active', 'paused', 'cancelled')
    `);

    // Agregar columna subscription_id
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'subscription_id',
        type: 'varchar',
        isNullable: true,
      }),
    );

    // Agregar columna subscription_status
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'subscription_status',
        type: 'subscription_status_enum',
        default: `'none'`,
      }),
    );

    // Agregar columna subscription_end_date
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'subscription_end_date',
        type: 'date',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'subscription_end_date');
    await queryRunner.dropColumn('users', 'subscription_status');
    await queryRunner.dropColumn('users', 'subscription_id');
    await queryRunner.query(`DROP TYPE "subscription_status_enum"`);
  }
}
