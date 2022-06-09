import { MigrationInterface, QueryRunner } from "typeorm";

export class createUsersTable1654368645681 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE users
        (
            id serial NOT NULL,
            username text UNIQUE NOT NULL,
            email text UNIQUE NOT NULL,
            password text NOT NULL,
            PRIMARY KEY (id)
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE users');
    }

}
