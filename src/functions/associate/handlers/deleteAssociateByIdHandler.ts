import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

const deleteAssociateHandler: ValidatedEventAPIGatewayProxyEvent<unknown> = async (event) => {
  console.log('filler');
  return formatJSONResponse({
    message: 'Donovan was here!!!',
    event,
  });
};

export const main = middyfy(deleteAssociateHandler);
