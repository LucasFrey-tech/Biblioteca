import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsbnToBooks1734567890124 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE books
      ADD COLUMN isbn varchar(20) UNIQUE;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE books
      DROP COLUMN isbn;
    `);
  }
}
