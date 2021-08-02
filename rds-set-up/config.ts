/* eslint-disable import/no-extraneous-dependencies */
import * as dotenv from 'dotenv';

dotenv.config({});

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
} = process.env;

if (!DB_USERNAME || !DB_PASSWORD || !DB_HOST) {
  console.error('Please provide the username, password, and host of the database in the .env file');
  process.exit(-2);
}

export default `postgresql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}` as const;
