import { Model } from 'sequelize/types';
import Note from 'src/models/note';
import db from '../../repositories/models';

class NoteDAO {
  public static async getNotesByBatchAndWeek(
    batchId: string, weekNumber: number,
  ): Promise<Model<any, any>[] | null> {
    try {
      console.log(batchId, weekNumber);
      const notes = await db.Note.findAll({
        where: {
          batchBatchId: batchId,
          weekNumber,
        },

        include: [
          { model: db.Associate },
        ],

        // nest: true,
      });

      return notes;
    } catch (err) {
      console.error(err);
    }
    return null;
  }

  public static async notesByBatchIdAndWeekOverall(
    batchId: string, weekNumber: number,
  ): Promise<Note[] | null> {
    try {
      const notes = await db.Note.findAll({
        where: {
          batchBatchId: batchId,
          weekNumber,
          associateAssociateId: null,
        },
        order: [
          ['updatedAt', 'DESC'],
        ],
      });
      if (notes.length > 0) {
        return notes[0].get();
      }
    } catch (err) {
      console.error(err);
    }
    return null;
  }
}

export default NoteDAO;
