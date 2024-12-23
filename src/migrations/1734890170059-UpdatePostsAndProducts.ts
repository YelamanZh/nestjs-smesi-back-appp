import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePostsAndProducts1734890170059 implements MigrationInterface {
    name = 'UpdatePostsAndProducts1734890170059'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_94a85bb16d24033a2afdd5df060"`);
        await queryRunner.query(`CREATE TYPE "public"."products_status_enum" AS ENUM('новинка', 'акция', 'рекомендуем', 'хит', 'обычный')`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" text NOT NULL, "isAvailable" boolean NOT NULL DEFAULT true, "status" "public"."products_status_enum" NOT NULL DEFAULT 'обычный', "price" numeric(10,2) NOT NULL, "color" character varying, "waterResistance" character varying, "maxAggregateSize" character varying, "mixingRatio" character varying, "materialConsumption" character varying, "mobilityGrade" character varying, "applicationTemperature" character varying, "solutionLife" character varying, "materialClass" character varying, "specificEffectiveActivity" character varying, "adhesionStrength" character varying, "compressiveStrength" character varying, "strengthGrade" character varying, "dryingTime" character varying, "frostResistanceGrade" character varying, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "postId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" ADD "postId" integer`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TYPE "public"."products_status_enum"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_94a85bb16d24033a2afdd5df060" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
