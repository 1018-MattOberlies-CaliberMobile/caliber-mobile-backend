/* eslint-disable no-extra-semi */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
import Associate from './associate';
import Note from './note';
import User from './user';

export default interface Batch {
    batchId: string,
    batchTitle: string,
    trainers: User[],
    startDate: string,
    endDate: string,
    associates: Associate[],
    notes: Note[],
};
