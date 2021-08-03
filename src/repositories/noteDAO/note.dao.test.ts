/* eslint-disable no-undef */
import noteDao from './note.dao';

describe('note DAO', () => {
  describe('getNoteWeek', () => {
    test('returns a list of notes for a given week', async () => {
      const weekNumber = Math.floor(Math.random() * 10);
      const batchId = '123-456-789'
      const noteList = await noteDao.getNotesByBatchAndWeek(batchId, weekNumber);
      const returnedWeek = noteList[0].weekNumber;
      expect(returnedWeek).toEqual(weekNumber);
    });
  });
});
