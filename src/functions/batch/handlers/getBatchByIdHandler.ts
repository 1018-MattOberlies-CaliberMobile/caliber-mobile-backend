import 'source-map-support/register';
import BatchDao from 'src/repositories/batch.dao';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

const getBatchByIdHandler: ValidatedEventAPIGatewayProxyEvent<unknown> = async (event) => {
  const { batchId } = event.pathParameters;
  const data = await BatchDao.getBatchById(batchId);
  return formatJSONResponse({
    message: data,
    event,
  });
};

export const main = middyfy(getBatchByIdHandler);
