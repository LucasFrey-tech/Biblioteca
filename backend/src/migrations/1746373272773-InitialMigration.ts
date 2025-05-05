import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1746373272773 implements MigrationInterface {
    name = 'InitialMigration1746373272773'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id_user" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "role" character varying(255) NOT NULL, "registration_date" TIMESTAMP NOT NULL DEFAULT now(), "plan" character varying(50) NOT NULL DEFAULT 'free', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_fbb07fa6fbd1d74bee9782fb945" PRIMARY KEY ("id_user"))`);
        await queryRunner.query(`CREATE TABLE "books" ("id_book" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "author" character varying(255) NOT NULL, "genre" character varying(100) NOT NULL, "description" text NOT NULL, "price" double precision NOT NULL, "stock" integer NOT NULL, "exclusive" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8065cbf94f3902bef4d65fcaf67" PRIMARY KEY ("id_book"))`);
        await queryRunner.query(`CREATE TABLE "shopping_cart" ("id_cart" SERIAL NOT NULL, "creation_date" TIMESTAMP NOT NULL DEFAULT now(), "id_user" integer NOT NULL, "id_book" integer NOT NULL, CONSTRAINT "PK_d9a8440a158a37dfa2617cf9f5b" PRIMARY KEY ("id_cart"))`);
        await queryRunner.query(`ALTER TABLE "shopping_cart" ADD CONSTRAINT "FK_c5c803654dbab6f0d71c588b11b" FOREIGN KEY ("id_user") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shopping_cart" ADD CONSTRAINT "FK_345ebb8e7cc995f1d0daef2a7b7" FOREIGN KEY ("id_book") REFERENCES "books"("id_book") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shopping_cart" DROP CONSTRAINT "FK_345ebb8e7cc995f1d0daef2a7b7"`);
        await queryRunner.query(`ALTER TABLE "shopping_cart" DROP CONSTRAINT "FK_c5c803654dbab6f0d71c588b11b"`);
        await queryRunner.query(`DROP TABLE "shopping_cart"`);
        await queryRunner.query(`DROP TABLE "books"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
