import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import Models from '../../../repositories/models';
import schema from '../schemas/createNoteSchema';
import Note from 'src/models/note';
import { TechnicalScoreString } from 'src/@types';
import Associate from 'src/models/associate';

const createNoteHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { noteContent, technicalScore, weekNumber } = event.body
  const temp: Note = {
    noteContent,
    technicalScore: technicalScore.toString() as TechnicalScoreString,
    weekNumber,
    associate: event.body.associate as Associate,
  };
  const note = await Models.Note.create(temp);
  console.log('filler');
  return formatJSONResponse({
    message: note,
  });
};

export const main = middyfy(createNoteHandler);
