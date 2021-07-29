import { handlerPath } from '@libs/handlerResolver';
import createBatchSchema from './schemas/createBatchSchema';
import updateBatchSchema from './schemas/updateBatchSchema';

type FunctionHandler = 'getAllBatchesHandler' | 'createBatchHandler' | 'updateBatchHandler' | 'getBatchByIdHandler' | 'getBatchByYearHandler' | 'deleteBatchByIdHandler';

const batch = 'batch';
const hanlderPath = (fun: FunctionHandler) => `${handlerPath(__dirname)}/handlers/${fun}.main`;

export const getAllBatches = {
  handler: hanlderPath('getAllBatchesHandler'),
  events: [
    {
      http: {
        method: 'get',
        path: batch,
        cors: true,
        request: {
          schema: null,
        },
      },
    },
  ],
};

export const createBatch = {
  handler: hanlderPath('createBatchHandler'),
  events: [
    {
      http: {
        method: 'post',
        path: batch,
        cors: true,
        request: {
          schema: {
            'application/json': createBatchSchema,
          },
        },
      },
    },
  ],
};

export const updateBatch = {
  handler: hanlderPath('updateBatchHandler'),
  events: [
    {
      http: {
        method: 'put',
        path: batch,
        cors: true,
        request: {
          schema: {
            'application/json': updateBatchSchema,
          },
        },
      },
    },
  ],
};

export const getBatchById = {
  handler: hanlderPath('getBatchByIdHandler'),
  events: [
    {
      http: {
        method: 'get',
        path: `${batch}/{batchId}`,
        cors: true,
        request: {
          schema: null,
        },
      },
    },
  ],
};

export const deleteBatchById = {
  handler: hanlderPath('deleteBatchByIdHandler'),
  events: [
    {
      http: {
        method: 'delete',
        path: `${batch}/{batchId}`,
        cors: true,
        request: {
          schema: null,
        },
      },
    },
  ],
};

export const getBatchByYear = {
  handler: hanlderPath('getBatchByYearHandler'),
  events: [
    {
      http: {
        method: 'get',
        path: `${batch}/year/{year}`,
        cors: true,
        request: {
          schema: null,
        },
      },
    },
  ],
};
