import { handlerPath } from '@libs/handlerResolver';
import createNoteSchema from './schemas/createNoteSchema';
import updateNoteSchema from './schemas/updateNoteSchema';

type FunctionHandler = 'createNoteHandler' | 'getAllNotesHandler' | 'getNoteByIdHandler' | 'updateNoteHandler' | 'deleteNoteHandler' | 'getNotesByBatchIdHandler' | 'getNotesByBatchIdAndByWeekHandler' | 'getNotesByBatchIdAndWeekOverallHandler' | 'getNotesByAssociateIdHandler';

const note = 'api/v1/note';
const hanlderPath = (fun: FunctionHandler) => `${handlerPath(__dirname)}/handlers/${fun}.main`;

const root = 'note';

export const createNote = {
  handler: hanlderPath('createNoteHandler'),
  events: [
    {
      http: {
        method: 'post',
        path: note,
        cors: true,
        request: {
          schema: {
            'application/json': createNoteSchema,
          },
        },
      },
    },
  ],
};

export const getAllNotes = {
  handler: hanlderPath('getAllNotesHandler'),
  events: [
    {
      http: {
        method: 'get',
        path: note,
        cors: true,
        request: {
          schema: null,
        },
      },
    },
  ],
};

export const getNoteById = {
  handler: hanlderPath('getNoteByIdHandler'),
  events: [
    {
      http: {
        method: 'get',
        path: `${note}/{noteId}`,
        cors: true,
        request: {
          schema: null,
        },
      },
    },
  ],
};

export const updateNote = {
  handler: hanlderPath('updateNoteHandler'),
  events: [
    {
      http: {
        method: 'put',
        path: note,
        cors: true,
        request: {
          schema: {
            'application/json': updateNoteSchema,
          },
        },
      },
    },
  ],
};

export const deleteNote = {
  handler: hanlderPath('deleteNoteHandler'),
  events: [
    {
      http: {
        method: 'delete',
        path: `${note}/{noteId}`,
        cors: true,
        request: {
          schema: null,
        },
      },
    },
  ],
};

export const getNotesByBatchIdAndByWeek = {
  handler: hanlderPath('getNotesByBatchIdAndByWeekHandler'),
  events: [
    {
      http: {
        method: 'get',
        path: `${note}/batch/{batchId}/{week}`,
        cors: true,
        request: {
          schema: null,
        },
      },
    },
  ],
};

export const getNotesByBatchId = {
  handler: hanlderPath('getNotesByBatchIdHandler'),
  events: [
    {
      http: {
        method: 'get',
        path: `${note}/batch/{batchId}`,
        cors: true,
        request: {
          schema: null,
        },
      },
    },
  ],
};

export const getNotesByBatchIdAndWeekOverall = {
  handler: hanlderPath('getNotesByBatchIdAndWeekOverallHandler'),
  events: [
    {
      http: {
        method: 'get',
        path: `${note}/batch/{batchId}/{week}/overall`,
        cors: true,
        request: {
          schema: null,
        },
      },
    },
  ],
};

export const getNotesByAssociate = {
  handler: hanlderPath('getNotesByAssociateIdHandler'),
  events: [
    {
      http: {
        method: 'get',
        path: `${note}/associate/{associateId}`,
        cors: true,
        request: {
          schema: null,
        },
      },
    },
  ],
};
