import { handlerPath } from '@libs/handlerResolver';

type FunctionHandler = 'getAllUsersHandler' | 'getUserByIdHandler';

const user = 'api/v1/user';
const pgLayer = 'PostgresLambdaLayer';
const hanlderPath = (fun: FunctionHandler) => `${handlerPath(__dirname)}/handlers/${fun}.main`;

export const getAllUsers = {
  handler: hanlderPath('getAllUsersHandler'),
  layers: [
    { Ref: pgLayer },
  ],
  events: [
    {
      http: {
        method: 'get',
        path: user,
        cors: true,
        request: {
          schema: null,
        },
      },
    },
  ],
};

export const getUserById = {
  handler: hanlderPath('getUserByIdHandler'),
  layers: [
    { Ref: pgLayer },
  ],
  events: [
    {
      http: {
        method: 'get',
        path: `${user}/{userId}`,
        cors: true,
        request: {
          schema: null,
        },
      },
    },
  ],
};
