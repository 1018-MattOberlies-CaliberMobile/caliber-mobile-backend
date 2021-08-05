import { handlerPath } from '@libs/handlerResolver';
import createNoteSchema from './schemas/createNoteSchema';
import updateNoteSchema from './schemas/updateNoteSchema';

type FunctionHandler = 'createNoteHandler' | 'getAllNotesHandler' | 'getNoteByIdHandler' | 'updateNoteHandler' | 'deleteNoteHandler' | 'getNotesByBatchIdHandler' | 'getNotesByBatchIdAndByWeekHandler' | 'getNotesByBatchIdAndWeekOverallHandler' | 'getNotesByAssociateIdHandler';

const note = 'api/v1/note';
const pgLayer = 'PostgresLambdaLayer';
const hanlderPath = (fun: FunctionHandler) => `${handlerPath(__dirname)}/handlers/${fun}.main`;

export const createNote = {
  handler: hanlderPath('createNoteHandler'),
  layers: [
    { Ref: pgLayer }
  ],
  events: [
    {
      http: {
        method: 'post',
        path: note,
        // integration: 'lambda',
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
  layers: [
    { Ref: pgLayer }
  ],
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
  layers: [
    { Ref: pgLayer }
  ],
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
  layers: [
    { Ref: pgLayer }
  ],
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
  layers: [
    { Ref: pgLayer }
  ],
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
  layers: [
    { Ref: pgLayer }
  ],
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
  layers: [
    { Ref: pgLayer }
  ],
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
  layers: [
    { Ref: pgLayer }
  ],
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
  layers: [
    { Ref: pgLayer }
  ],
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
