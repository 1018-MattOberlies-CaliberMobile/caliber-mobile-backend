import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import * as Models from '../../../repositories/models';


const getBatchYearsHandler: ValidatedEventAPIGatewayProxyEvent<unknown> = async () => {
  const years: string[] = (await Models.default.Batch.findAll({
    attributes: ['startDate'],
  })).map((response) => {
    const date = response.getDataValue('startDate');
    return new Date(date).getFullYear().toString();
  });

  return formatJSONResponse({
    years: [...new Set(years)]
  });
};

export const main = middyfy(getBatchYearsHandler);
