import { Sequelize } from 'sequelize';

const dbHost = process.env.POSTGRES_HOST || 'localhost';
const dbUrl = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${dbHost}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;

const sequelize = new Sequelize(dbUrl, {
  dialect: 'postgres',
});

export default sequelize;