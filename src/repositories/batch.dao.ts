import db from './config';

db.authenticate()
  .then(() => console.debug('Connected to database'))
  .catch((err) => console.error('DB Connection Error', err));
