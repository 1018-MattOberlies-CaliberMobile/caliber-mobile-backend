import db from '../../repositories/models'


export type DBNote= {
  note_id: string,
  note_content: string,
  technical_score: 0 | 1 | 2 | 3 | 4,
  week_number: number,
  batch_id: string,
  associate_id: string
}

class NoteDAO {
  constructor() {
  };

  public async getNotesByBatchAndWeek(batchId: string, weekNumber: number): Promise<unknown> {
    try {
      return await db.Note.findAll({
        where: {
          batchBatchId: batchId,
          weekNumber
        }  
      })
    } catch (err) {
      throw err;
    }
  };
}

export default new NoteDAO();
