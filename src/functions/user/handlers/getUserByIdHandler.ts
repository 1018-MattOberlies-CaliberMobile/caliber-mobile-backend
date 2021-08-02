import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { User } from 'src/repositories/models';

const getUserByIdHandler: ValidatedEventAPIGatewayProxyEvent<unknown> = async (event) => {
  const user = await User.findByPk(event.path.split('/').pop())
  return formatJSONResponse({
    user
  });
};

export const main = middyfy(getUserByIdHandler);
