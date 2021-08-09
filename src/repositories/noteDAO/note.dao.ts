import { Model } from 'sequelize/types';
import db from '../../repositories/models';

class NoteDAO {
  public static async getNotesByBatchAndWeek(
    batchId: string, weekNumber: number,
  ): Promise<Model<any, any>[] | null> {
    try {
      console.log(batchId, weekNumber);
      return await db.Note.findAll({
        where: {
          batchBatchId: batchId,
          weekNumber,
        },

        include: [
          { model: db.Associate },
        ],
      });
    } catch (err) {
      console.error(err);
    }
    return null;
  }
}

export default NoteDAO;
