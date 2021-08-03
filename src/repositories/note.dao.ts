import { Pool } from "pg";
import Note from "src/models/note";
import connectionString from "./connection";

export type DBNote= {
  note_id: string,
  note_content: string,
  technical_score: 0 | 1 | 2 | 3 | 4,
  week_number: number,
  batch_id: string,
  associate_id: string
}

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
    try {
      const res = await client.query<Note[]>('ENTER QUERY STRING HERE($1,$2)', [batchId, weekNumber]); // wip
      const rows = res.rows as DBNote[];
      if(res.rows.length > 0) {
        return rows.map<Note>((dbNote) => ({
          noteId: dbNote.note_id,
          noteContent: dbNote.note_content,
          technicalScore: dbNote.technical_score,
          associate: dbNote.associate_id, // find a way/function to get an associate using dbNote.associate_id
          weekNumber: dbNote.week_number,
        })) as Note[];
      }
      return [] as Note[];
    } catch (err) {
      throw err;
    } finally {
      client.release();
    }
  };
}

export default new NoteDAO();
