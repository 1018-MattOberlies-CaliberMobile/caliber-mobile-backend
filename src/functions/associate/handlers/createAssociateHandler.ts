import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from '../schemas/createAssociateSchema';

const createAssociateHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  console.log('filler');
  return formatJSONResponse({
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = middyfy(createAssociateHandler);
