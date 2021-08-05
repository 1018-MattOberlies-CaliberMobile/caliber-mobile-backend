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
  const { noteId, noteContent, technicalScore, weekNumber, associate, batchId } = event.body
  const temp: Note = {
    batchId,
    noteContent,
    technicalScore: technicalScore.toString() as TechnicalScoreString,
    weekNumber,
    associate: associate as Associate,
  };

  const note = noteId && await Models.Note.findOne({ where: { noteId } });
  let extra = {};

  if (temp.associate?.associateId) {
    extra = {
      associateAssociateId: temp.associate.associateId,
    }
  };
  let status;
  if (note) {
    status = await Models.Note.update(temp, {
      where: { noteId }
    });
  } else {
    status = await Models.Note.create({
      ...temp,
      ...extra,
      batchBatchId: temp.batchId,
    });
  }

  return formatJSONResponse({
    message: status,
  });
};

export const main = middyfy(createNoteHandler);