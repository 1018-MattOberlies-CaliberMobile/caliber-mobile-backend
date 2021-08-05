import { Pool, PoolConfig } from 'pg';
import connectionString from './config';
import run from './run';

const PoolParams: PoolConfig = {
  connectionString,
  min: 5,
  max: 20,
};

const pool = new Pool(PoolParams);
run(pool, connectionString, './rds-set-up/sql/populate.sql');
