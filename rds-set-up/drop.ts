/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unneeded-ternary */
import * as dotenv from 'dotenv';
import { Pool, PoolConfig } from 'pg';

import run from './run';

dotenv.config({});

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
} = process.env;

const connectionString = `postgresql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}`;
const PoolParams: PoolConfig = {
  connectionString,
  min: 5,
  max: 20,
};

const pool = new Pool(PoolParams);
run(pool, connectionString, './rds-set-up/sql/drop.sql');
