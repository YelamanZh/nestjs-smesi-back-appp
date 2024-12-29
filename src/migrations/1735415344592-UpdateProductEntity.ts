import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProductEntity1735415344592 implements MigrationInterface {
    name = 'UpdateProductEntity1735415344592'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" RENAME COLUMN "username" TO "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "previewImage" character varying(1024)`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "cart_items" ALTER COLUMN "quantity" SET DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "cart_items" ALTER COLUMN "productId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "FK_72679d98b31c737937b8932ebe6" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "FK_72679d98b31c737937b8932ebe6"`);
        await queryRunner.query(`ALTER TABLE "cart_items" ALTER COLUMN "productId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cart_items" ALTER COLUMN "quantity" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "updatedAt" character varying(96) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "previewImage"`);
        await queryRunner.query(`ALTER TABLE "comments" RENAME COLUMN "updatedAt" TO "username"`);
    }

}
