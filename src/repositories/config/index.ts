import { Dialect, Options, Sequelize } from 'sequelize';
import * as pg from 'pg';

const {
  DATABASE_DIALECT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_HOST,
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
};

const init = (): Sequelize => {
  const db = new Sequelize(options);
  db.authenticate().then(() => console.log('connected to database')).catch(console.error);
  db.sync({ force: false }).then((syncedDB) => {
    console.log('>> sync db');
    return syncedDB;
  }).catch((err) => {
    console.error(err);
  });
  console.log('>> not sync');
  return db;
};

export default init();

