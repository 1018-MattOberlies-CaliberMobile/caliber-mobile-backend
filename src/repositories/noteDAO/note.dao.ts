import { Model } from 'sequelize/types';
import db from '../../repositories/models';

class NoteDAO {
  public static async getNotesByBatchAndWeek(
    batchId: string, weekNumber: number,
  ): Promise<Model<any, any>[] | null> {
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
    return null;
  }
}

export default NoteDAO;
