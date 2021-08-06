/* eslint-disable dot-notation */
/* eslint-disable prefer-destructuring */
import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import batchDAO from '../../../repositories/batchDAO/batch.dao';

const getBatchByYearHandler: ValidatedEventAPIGatewayProxyEvent<unknown> = async (event) => {
  const year = event.path['year'];
  const accessToken = event.headers['Authorization'].split(' ').pop();

  try {
    const batches = await batchDAO.getBatchesByYear(year, accessToken);
    return formatJSONResponse({ batches });
  } catch (err) {
    return { statusCode: 500, body: err.message };
  }
};

export const main = middyfy(getBatchByYearHandler);
