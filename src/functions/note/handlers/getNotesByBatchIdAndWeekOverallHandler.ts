import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

// eslint-disable-next-line max-len
const getNotesByBatchIdAndWeekOverall: ValidatedEventAPIGatewayProxyEvent<unknown> = async (event) => {
  console.log('filler');
  return formatJSONResponse({
    message: 'Hello get notes by batch id and week overall, welcome to the exciting Serverless world!',
    event,
  });
};

export const main = middyfy(getNotesByBatchIdAndWeekOverall);
