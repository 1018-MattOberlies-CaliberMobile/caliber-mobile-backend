import { Dialect, Options, Sequelize } from 'sequelize';

const {
  DATABASE_NAME,
  DATABASE_DIALECT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_HOST,
} = process.env;

const supported = ['mysql', 'postgres', 'sqlite', 'mariadb', 'mssql'];
// if (supported.includes(DATABASE_DIALECT)) {
//   console.error(DATABASE_DIALECT, 'is not support in sequelize', supported);
//   process.exit(-3);
// }

export const options: Options = {
  // database: DATABASE_NAME,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  host: DATABASE_HOST,
  dialect: DATABASE_DIALECT as Dialect,
  // TODO: optimal configuration for lambda
  pool: {
    max: 5,
    min: 0,
    acquire: 6000,
    idle: 200,
  },
};

export const db = new Sequelize(options);
db.authenticate().then(console.debug).catch(console.error);
