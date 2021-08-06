import 'source-map-support/register';
import NoteDAO from '../../../repositories/noteDAO/note.dao';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

// eslint-disable-next-line max-len
const getNotesByBatchIdAndWeekHandler: ValidatedEventAPIGatewayProxyEvent<unknown> = async (event) => {
  const { batchId, week } = event.pathParameters;
  const data = await NoteDAO.getNotesByBatchAndWeek(batchId, Number(week));

  return formatJSONResponse({
    message: data,
    event,
  });
};

export const main = middyfy(getNotesByBatchIdAndWeekHandler);
