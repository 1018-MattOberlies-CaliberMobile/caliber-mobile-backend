import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import * as Models from '../../../repositories/models';
import Batch from '../../../models/batch';


const getBatchByYearHandler: ValidatedEventAPIGatewayProxyEvent<unknown> = async (event) => {
  const year = event.path.split('/').pop();
  const batches: Batch[] = (await Models.default.Batch.findAll()).map((response) => response.get());

  // This would be better, but it doesnt work :(
  // const res = batches.filter((batch) => {
  //   new Date(batch.startDate).toISOString().split('-').shift() === year;
  // });

  // Need to check the role of the user making the request. If a trainer, should only return batches for which
  // they are a trainer for
  const res = [];
  batches.forEach((batch) => {
    if(new Date(batch.startDate).getFullYear().toString() === year) {
      res.push(batch);
    }
  });

  return formatJSONResponse({
    res,
  });
};

export const main = middyfy(getBatchByYearHandler);
