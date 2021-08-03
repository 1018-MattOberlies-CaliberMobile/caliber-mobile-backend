import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import Models from '../../../repositories/models';
import schema from '../schemas/createNoteSchema';

const createNoteHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const note = await Models.Note.create(event.body);
  console.log('filler');
  return formatJSONResponse({
    message: note,
  });
};

export const main = middyfy(createNoteHandler);
