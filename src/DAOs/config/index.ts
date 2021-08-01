import { Dialect, Options, Sequelize } from 'sequelize';

const {
  DATABASE_NAME,
  DATABASE_DIALECT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_HOST,
} = process.env;

export const options: Options = {
  database: DATABASE_NAME,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  host: DATABASE_HOST,
  dialect: DATABASE_DIALECT as Dialect,
  pool: {
    max: 5,
    min: 0,
    acquire: 300,
    idle: 200,
  },
};

export default new Sequelize(options);
