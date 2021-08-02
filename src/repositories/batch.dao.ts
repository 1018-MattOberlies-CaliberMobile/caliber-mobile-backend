import db from './config';

db.authenticate()
  .then(() => console.log('Connected to database'))
  .catch((err) => console.error('DB Connection Error', err));
