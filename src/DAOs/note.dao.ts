import { Pool } from "pg";
import Note from "src/models/note";
import connectionString from "./connection";

class NoteDAO {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString,
      min: 5,
      max: 20,
    });
  };

  public async getNotesByBatchAndWeek(batchId: string, weekNumber: number) {
    const client = await this.pool.connect();
    const id = batchId;
    const wkNum = weekNumber;
    try {
      
      return [] as Note[]
    } catch (err) {
      throw err;
    } finally {
      client.release();
    }
  };
}

export default new NoteDAO();
