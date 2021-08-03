import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import db from '../../../repositories/models'

const getAllUsersHandler: ValidatedEventAPIGatewayProxyEvent<unknown> = async (event) => {
  const users = await db.User.findAll();
  return formatJSONResponse({
    users
  });
};

export const main = middyfy(getAllUsersHandler);
