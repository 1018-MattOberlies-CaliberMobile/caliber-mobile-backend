import { Dialect, Options, Sequelize } from 'sequelize';
import * as pg from 'pg';

const {
  DATABASE_DIALECT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  TESTING,
} = process.env;

const supported = ['mysql', 'postgres', 'sqlite', 'mariadb', 'mssql'];
if (!supported.includes(DATABASE_DIALECT)) {
  console.error(DATABASE_DIALECT, 'is not support in sequelize', supported);
  process.exit(-3);
}

export const options: Options = {
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  host: DATABASE_HOST,
  dialect: DATABASE_DIALECT as Dialect,
  pool: {
    max: 5,
    min: 0,
    acquire: 6000,
    idle: 200,
  },
  dialectModule: pg,
  logging: TESTING ? (...msg) => msg : console.log,
};

const init = (): Sequelize => {
  let db = new Sequelize(options);
  db.authenticate().then(() => {
    if (!TESTING) {
      console.log('connected to db');
    }
  }).catch((err) => {
    if (!TESTING) {
      console.error(err);
    }
  });
  db.sync({ force: false }).then((syncedDB) => {
    db = syncedDB;
  }).catch((err) => {
    if (!TESTING) {
      console.error(err);
    }
  });
  return db;
};

export default init();
