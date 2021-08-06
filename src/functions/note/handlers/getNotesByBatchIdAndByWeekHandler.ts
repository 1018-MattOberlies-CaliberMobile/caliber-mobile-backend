/* eslint-disable prefer-destructuring */
/* eslint-disable dot-notation */
import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import NoteDAO from '../../../repositories/noteDAO/note.dao';

// eslint-disable-next-line max-len
const getNotesByBatchIdAndWeekHandler: ValidatedEventAPIGatewayProxyEvent<unknown> = async (event) => {
  const batchId = event.path['batchId'];
  const week = event.path['week'];
  const data = await NoteDAO.getNotesByBatchAndWeek(batchId, Number(week));

  return formatJSONResponse({
    message: data,
    event,
  });
};

export const main = middyfy(getNotesByBatchIdAndWeekHandler);
