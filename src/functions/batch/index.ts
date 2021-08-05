import { handlerPath } from '@libs/handlerResolver';
import createBatchSchema from './schemas/createBatchSchema';
import updateBatchSchema from './schemas/updateBatchSchema';

type FunctionHandler = 'getAllBatchesHandler' | 'createBatchHandler' | 'updateBatchHandler' | 'getBatchByIdHandler' | 'getBatchByYearHandler' | 'deleteBatchByIdHandler' | 'getBatchYearsHandler';

const batch = 'api/v1/batch';
const pgLayer = 'PostgresLambdaLayer';
const hanlderPath = (fun: FunctionHandler) => `${handlerPath(__dirname)}/handlers/${fun}.main`;

export const getAllBatches = {
  handler: hanlderPath('getAllBatchesHandler'),
  layers: [
    { Ref: pgLayer }
  ],
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
  layers: [
    { Ref: pgLayer }
  ],
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
  layers: [
    { Ref: pgLayer }
  ],
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
  layers: [
    { Ref: pgLayer }
  ],
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
  layers: [
    { Ref: pgLayer }
  ],
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
  layers: [
    { Ref: pgLayer }
  ],
  events: [
    {
      http: {
        method: 'get',
        path: `${batch}/year/{year}`,
        integration: 'lambda',
        cors: true,
      },
    },
  ],
};

export const getBatchYears = {
  handler: hanlderPath('getBatchYearsHandler'),
  layers: [
    { Ref: pgLayer }
  ],
  events: [
    {
      http: {
        method: 'get',
        path: `${batch}/year/`,
        integration: 'lambda',
        cors: true,
      },
    },
  ],
};
