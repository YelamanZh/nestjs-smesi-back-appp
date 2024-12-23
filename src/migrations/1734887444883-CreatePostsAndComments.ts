import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePostsAndComments1681234567890 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" SERIAL PRIMARY KEY,
        "username" VARCHAR(255) NOT NULL,
        "email" VARCHAR(255) NOT NULL
      );
    `);

    await queryRunner.query(`
      CREATE TABLE "posts" (
        "id" SERIAL PRIMARY KEY,
        "title" VARCHAR(255) NOT NULL,
        "content" TEXT NOT NULL,
        "createdAt" TIMESTAMP DEFAULT now()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE "comments" (
        "id" SERIAL PRIMARY KEY,
        "content" TEXT NOT NULL,
        "entityId" INT NOT NULL,
        "entityType" VARCHAR(50) NOT NULL,
        "createdAt" TIMESTAMP DEFAULT now(),
        "userId" INT REFERENCES "users"("id") ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "comments";`);
    await queryRunner.query(`DROP TABLE "posts";`);
    await queryRunner.query(`DROP TABLE "users";`);
  }
}