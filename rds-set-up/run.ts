import * as fs from 'fs';
import { Pool } from 'pg';

const run = (pool: Pool, connectionString: string, pathToSQL: string) => {
  fs.readFile(pathToSQL, (err, data) => {
    if (!err) {
      (async () => {
        console.log(connectionString);
        console.log(data.toString());
        const client = await pool.connect();

        try {
          await client.query('BEGIN');
          await client.query(data.toString());
          await client.query('COMMIT');
        } catch (exception) {
          await client.query('ROLLBACK');
          console.error('SQL::EXCEPTION >> ', exception);
        } finally {
          client.release();
        }
      })();
    } else {
      console.error(err);
    }
  });
};

export default run;
