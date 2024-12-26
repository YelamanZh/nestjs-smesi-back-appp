import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPriceColumnToProduct21735238811675 implements MigrationInterface {
    name = 'AddPriceColumnToProduct21735238811675'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "price" numeric(10,2) DEFAULT 0  NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price"`);
    }

}
