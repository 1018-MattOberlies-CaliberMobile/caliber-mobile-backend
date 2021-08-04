/* eslint-disable no-extra-semi */
/* eslint-disable semi */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-useless-constructor */
/* eslint-disable no-unused-vars */

import { TechnicalScore, TechnicalScoreString } from '../@types';
import Associate from './associate';

export default interface Note {
    noteId?: string,
    noteContent: string,
    technicalScore: TechnicalScoreString,
    associate?: Associate,
    weekNumber: number,
};
