import { handlerPath } from '@libs/handlerResolver';
import createNoteSchema from './schemas/createNoteSchema';
import updateNoteSchema from './schemas/updateNoteSchema';

type FunctionHandler = 'createNoteHandler' | 'getAllNotesHandler' | 'getNoteByIdHandler' | 'deleteNoteHandler' | 'getNotesByBatchIdHandler' | 'getNotesByBatchIdAndByWeekHandler' | 'getNotesByBatchIdAndWeekOverallHandler' | 'getNotesByAssociateIdHandler';

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
        integration: 'lambda',
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
        integration: 'lambda',
      },
    },
  ],
};

export const updateNote = {
  handler: hanlderPath('createNoteHandler'),
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
        integration: 'lambda',
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
        integration: 'lambda',
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
        integration: 'lambda',
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
        integration: 'lambda',
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
        integration: 'lambda',
      },
    },
  ],
};
