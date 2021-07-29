import { handlerPath } from '@libs/handlerResolver';
import schema from './schema';

type Function = 'createNoteHandler' | 'getAllNotes' | 'getNote' | 'updateNote' | 'deleteNote' | 'getNotesByBatchId' | 'getNotesByWeek' | 'getNotesOverall' | 'getNotesByAssociate';

const hanlderPath = (fun: Function) => `${handlerPath(__dirname)}/${fun}.main`;

const root = 'note';

export const createNote = {
  handler: hanlderPath('createNoteHandler'),
  events: [
    {
      http: {
        method: 'post',
        path: root,
        cors: true,
        request: {
          schema: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};

export const getAllNotes = {
  handler: hanlderPath('getAllNotes'),
  events: [
    {
      http: {
        method: 'get',
        path: root,
        cors: true,
        request: {
          schema: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};

export const getNote = {
  handler: hanlderPath('getNote'),
  events: [
    {
      http: {
        method: 'get',
        path: `${root}/{id}`,
        cors: true,
        request: {
          schema: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};

export const updateNote = {
  handler: hanlderPath('updateNote'),
  events: [
    {
      http: {
        method: 'put',
        path: `${root}`,
        cors: true,
        request: {
          schema: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};

export const deleteNote = {
  handler: hanlderPath('deleteNote'),
  events: [
    {
      http: {
        method: 'delete',
        path: 'hello',
        cors: true,
        request: {
          schema: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};

export const getNotesByWeek = {
  handler: hanlderPath('getNotesByWeek'),
  events: [
    {
      http: {
        method: 'get',
        path: 'hello',
        cors: true,
        request: {
          schema: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};

export const getNotesOverall = {
  handler: hanlderPath('getNotesOverall'),
  events: [
    {
      http: {
        method: 'get',
        path: 'hello',
        cors: true,
        request: {
          schema: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};

export const getNotesByAssociate = {
  handler: hanlderPath('getNotesByAssociate'),
  events: [
    {
      http: {
        method: 'get',
        path: 'hello',
        cors: true,
        request: {
          schema: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};

export const getNotesByBatchId = {
  handler: hanlderPath('getNotesByBatchId'),
  events: [
    {
      http: {
        method: 'get',
        path: 'hello',
        cors: true,
        request: {
          schema: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};
