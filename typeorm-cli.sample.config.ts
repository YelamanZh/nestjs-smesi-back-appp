import { DataSource } from "typeorm";

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: 'WQAdkt82',
    database: 'smesibd',
    entities: ['**/*.entity.js'],
    migrations: ['migrations/*.js'],
})