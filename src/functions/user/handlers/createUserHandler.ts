import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from '../schemas/createUserSchema';
import DB from 'src/repositories/models';

const createUserHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const created = await DB.User.create();
  console.debug('>> created user');
  return formatJSONResponse({
    created
  });
};

export const main = middyfy(createUserHandler);
