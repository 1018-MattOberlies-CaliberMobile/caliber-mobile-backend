import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

const getAllBatchesHandler: ValidatedEventAPIGatewayProxyEvent<unknown> = async (event) => {
  console.log('filler');
  return formatJSONResponse({
    message: 'Hello get all, welcome to the exciting Serverless world!',
    event,
  });
};

export const main = middyfy(getAllBatchesHandler);
