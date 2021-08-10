import { handlerPath } from '@libs/handlerResolver';
import createNoteSchema from './schemas/createNoteSchema';

type FunctionHandler = 'createNoteHandler' | 'getNotesByBatchIdAndByWeekHandler' | 'getNotesByBatchIdAndWeekOverallHandler';

const note = 'api/v1/note';
const pgLayer = 'PostgresLambdaLayer';
const hanlderPath = (fun: FunctionHandler) => `${handlerPath(__dirname)}/handlers/${fun}.main`;

export const createNote = {
  handler: hanlderPath('createNoteHandler'),
  layers: [
    { Ref: pgLayer },
  ],
  events: [
    {
      http: {
        method: 'post',
        path: note,
        cors: true,
        integration: 'lambda',
        request: {
          schema: {
            'application/json': createNoteSchema,
          },
        },
      },
    },
  ],
};

export const updateNote = {
  handler: hanlderPath('createNoteHandler'),
  layers: [
    { Ref: pgLayer },
  ],
  events: [
    {
      http: {
        method: 'put',
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

export const getNotesByBatchIdAndByWeek = {
  handler: hanlderPath('getNotesByBatchIdAndByWeekHandler'),
  layers: [
    { Ref: pgLayer },
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

export const getNotesByBatchIdAndWeekOverall = {
  handler: hanlderPath('getNotesByBatchIdAndWeekOverallHandler'),
  layers: [
    { Ref: pgLayer },
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
