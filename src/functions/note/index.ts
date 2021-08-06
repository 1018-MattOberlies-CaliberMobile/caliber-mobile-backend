import { handlerPath as pathMaker } from '@libs/handlerResolver';
import createNoteSchema from './schemas/createNoteSchema';
import updateNoteSchema from './schemas/updateNoteSchema';

type FunctionHandler = 'createNoteHandler' | 'getAllNotesHandler' | 'getNoteByIdHandler' | 'deleteNoteHandler' | 'getNotesByBatchIdHandler' | 'getNotesByBatchIdAndByWeekHandler' | 'getNotesByBatchIdAndWeekOverallHandler' | 'getNotesByAssociateIdHandler';

const note = 'api/v1/note';
const pgLayer = 'PostgresLambdaLayer';
const handlerPath = (fun: FunctionHandler) => `${pathMaker(__dirname)}/handlers/${fun}.main`;

export const createNote = {
  handler: handlerPath('createNoteHandler'),
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
  handler: handlerPath('getAllNotesHandler'),
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
  handler: handlerPath('getNoteByIdHandler'),
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
  handler: handlerPath('createNoteHandler'),
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
  handler: handlerPath('deleteNoteHandler'),
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
  handler: handlerPath('getNotesByBatchIdAndByWeekHandler'),
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
  handler: handlerPath('getNotesByBatchIdHandler'),
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
  handler: handlerPath('getNotesByBatchIdAndWeekOverallHandler'),
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
  handler: handlerPath('getNotesByAssociateIdHandler'),
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
