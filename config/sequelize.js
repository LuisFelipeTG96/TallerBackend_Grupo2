import 'dotenv/config';
import Sequelize from 'sequelize';

const orm = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'mysql',
    pool: {
      max: 2,
      idle: 10000,
      acquire: 60000
    }
  }
);

export default orm;
