import * as data from '../../mock-data/batch.json';
import NoteDAO from '../../DAOs/note.dao';

jest.mock('../../DAOs/note.dao.ts');

  describe('Testing get batch notes by batch id and by week', () => {
    beforeEach(() => {
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
    
    it('should return database data as a note array', () => {
      console.log(data);
      const notes = NoteDAO.getNotesByBatchAndWeek('d614bac5-681b-47a7-8e8f-98124d9be68c', 1);
      expect(notes[0].noteId).toBe('fbd515b8-6ff3-49f7-8ce8-ba3b6a1fb8f8')
    });

    it('should throw error if given bad data', () => {
      const notes = NoteDAO.getNotesByBatchAndWeek('I dont exist', 0);
      expect(notes).toThrowError();
    });
  });

