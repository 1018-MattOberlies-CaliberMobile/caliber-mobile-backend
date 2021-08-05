import { handlerPath } from '@libs/handlerResolver';
import createAssociateSchema from './schemas/createAssociateSchema';
import updateAssociateSchema from './schemas/updateAssociateSchema';

type FunctionHandler = 'getAllAssociatesHandler' | 'createAssociateHandler' | 'updateAssociateHandler' | 'getAssociateByIdHandler' | 'getAssociateByBatchIdHandler' | 'deleteAssociateByIdHandler'

const associate = 'api/v1/associate';
const pgLayer = 'PostgresLambdaLayer';
const hanlderPath = (fun: FunctionHandler) => `${handlerPath(__dirname)}/handlers/${fun}.main`;

export const createAssociate = {
  handler: hanlderPath('createAssociateHandler'),
  layers: [
    { Ref: pgLayer }
  ],
  events: [
    {
      http: {
        method: 'post',
        path: associate,
        cors: true,
        request: {
          schema: {
            'application/json': createAssociateSchema,
          },
        },
      },
    },
  ],
};

export const getAllAssociate = {
  handler: hanlderPath('getAllAssociatesHandler'),
  layers: [
    { Ref: pgLayer }
  ],
  events: [
    {
      http: {
        method: 'get',
        path: associate,
        cors: true,
        request: {
          schema: null,
        },
      },
    },
  ],
};

export const getAssociateById = {
  handler: hanlderPath('getAssociateByIdHandler'),
  layers: [
    { Ref: pgLayer }
  ],
  events: [
    {
      http: {
        method: 'get',
        path: `${associate}/{associateId}`,
        cors: true,
        request: {
          schema: null,
        },
      },
    },
  ],
};

export const deleteAssociateById = {
  handler: hanlderPath('deleteAssociateByIdHandler'),
  layers: [
    { Ref: pgLayer }
  ],
  events: [
    {
      http: {
        method: 'delete',
        path: `${associate}/{associateId}`,
        cors: true,
        request: {
          schema: null,
        },
      },
    },
  ],
};

export const updateAssociate = {
  handler: hanlderPath('updateAssociateHandler'),
  layers: [
    { Ref: pgLayer }
  ],
  events: [
    {
      http: {
        method: 'put',
        path: associate,
        cors: true,
        request: {
          schema: {
            'application/json': updateAssociateSchema,
          },
        },
      },
    },
  ],
};

export const getAssociateByBatchId = {
  handler: hanlderPath('getAssociateByBatchIdHandler'),
  layers: [
    { Ref: pgLayer }
  ],
  events: [
    {
      http: {
        method: 'get',
        path: `${associate}/batch/{batchId}`,
        cors: true,
        request: {
          schema: null,
        },
      },
    },
  ],
};
