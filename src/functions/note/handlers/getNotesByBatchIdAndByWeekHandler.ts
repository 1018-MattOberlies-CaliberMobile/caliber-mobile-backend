import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

// eslint-disable-next-line max-len
const getNotesByBatchIdAndWeekHandler: ValidatedEventAPIGatewayProxyEvent<unknown> = async (event) => {
  console.log('filler');
  return formatJSONResponse({
    message: 'Hello get all by batch id and week, welcome to the exciting Serverless world!',
    event,
  });
};

export const main = middyfy(getNotesByBatchIdAndWeekHandler);
