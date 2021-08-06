/* eslint-disable class-methods-use-this */
import db from '../../repositories/models';

class NoteDAO {
  constructor() { }

  public async getNotesByBatchAndWeek(batchId: string, weekNumber: number): Promise<unknown> {
    try {
      return await db.Note.findAll({
        where: {
          batchBatchId: batchId,
          weekNumber,
        },
      });
    } catch (err) {
      console.error(err);
    }
  }
}

export default new NoteDAO();
