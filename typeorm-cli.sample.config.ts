import { DataSource } from "typeorm";

export default new DataSource({
    type: 'postgres',
    host: '10.10.8.159',
    port: 5432,
    username: 'hqueue',
    password: 'password',
    database: 'postgres',
    entities: ['**/*.entity.js'],
    migrations: ['migrations/*.js'],
})