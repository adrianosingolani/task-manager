import { Sequelize } from 'sequelize';

const dbUrl = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@db:5432/${process.env.POSTGRES_DB}`

const sequelize = new Sequelize(dbUrl, {
  dialect: 'postgres',
});

export default sequelize;