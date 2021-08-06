import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import batchDAO from '../../../repositories/batchDAO/batch.dao';


const getBatchYearsHandler: ValidatedEventAPIGatewayProxyEvent<unknown> = async () => {
  const years = await batchDAO.getBatchYears();
  return formatJSONResponse({
    years,
  });
};

export const main = middyfy(getBatchYearsHandler);
