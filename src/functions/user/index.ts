import { handlerPath } from '@libs/handlerResolver';
import createUserSchema from './schemas/createUserSchema';
import updateUserSchema from './schemas/updateUserSchema';

type FunctionHandler = 'getAllUsersHandler' | 'createUserHandler' | 'updateUserHandler' | 'getUserByIdHandler';

const user = 'api/v1/user';
const hanlderPath = (fun: FunctionHandler) => `${handlerPath(__dirname)}/handlers/${fun}.main`;

export const createUser = {
  handler: hanlderPath('createUserHandler'),
  events: [
    {
      http: {
        method: 'post',
        path: user,
        cors: true,
        request: {
          schema: {
            'application/json': createUserSchema,
          },
        },
      },
    },
  ],
};

export const getAllUsers = {
  handler: hanlderPath('getAllUsersHandler'),
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

export const updateUser = {
  handler: hanlderPath('updateUserHandler'),
  events: [
    {
      http: {
        method: 'put',
        path: user,
        cors: true,
        request: {
          schema: {
            'application/json': updateUserSchema,
          },
        },
      },
    },
  ],
};
