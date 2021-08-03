import 'source-map-support/register';
import NoteDAO from '../../../repositories/noteDAO/note.dao';
import schema from '../schemas/getNotesByBatchIdAndByWeekSchema'

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

// eslint-disable-next-line max-len
const getNotesByBatchIdAndWeekHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { batchId, weekNumber} = event.body
  const data = await NoteDAO.getNotesByBatchAndWeek(batchId, weekNumber);
  return formatJSONResponse({
    message: data,
    event,
  });
};

export const main = middyfy(getNotesByBatchIdAndWeekHandler);
