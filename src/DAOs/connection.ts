
// TODO: create enviroment variables for postgres
const host = DATABASE_HOST;
const username = DATABASE_USERNAME;
const password = DATABASE_PASSWORD;

const connectionString = `postgresql://${username}:${password}@${host}`;

export default connectionString;