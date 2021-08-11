/* eslint-disable prefer-destructuring */
/* eslint-disable dot-notation */
import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import DB from '../../../repositories/noteDAO/note.dao';
// eslint-disable-next-line max-len
const getNotesByBatchIdAndWeekOverall: ValidatedEventAPIGatewayProxyEvent<unknown> = async (event) => {
  const batchId = event.path['batchId'];
  const week = event.path['week'];
  console.log(event.path, batchId, week);
  const note = await DB.notesByBatchIdAndWeekOverall(batchId, parseInt(week, 10));
  return formatJSONResponse({
    note,
  });
};

export const main = middyfy(getNotesByBatchIdAndWeekOverall);
