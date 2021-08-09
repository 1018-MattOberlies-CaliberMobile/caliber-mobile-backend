/* eslint-disable dot-notation */
import NoteDAO from './note.dao';

describe('note DAO', () => {
  describe('getNoteWeek', () => {
    test('returns a list of notes for a given week', async () => {
      const weekNumber = Math.floor(Math.random() * 10);
      const batchId = '123-456-789';
      const noteList = (await NoteDAO.getNotesByBatchAndWeek(batchId, weekNumber));
      console.log(noteList);
      const returnedWeek = noteList[0]['weekNumber'];
      expect(returnedWeek).toEqual(weekNumber);
    });
    test('returns null with invalid data', async () => {
      const batchId = '123-456-789';
      const noteList = (await NoteDAO.getNotesByBatchAndWeek(batchId, 0));
      expect(noteList).toEqual(null);
    });
  });
});
