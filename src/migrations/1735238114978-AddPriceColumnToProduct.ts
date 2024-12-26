import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPriceColumnToProduct1735238114978 implements MigrationInterface {
    name = 'AddPriceColumnToProduct1735238114978'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "price" numeric(10,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price"`);
    }

}
