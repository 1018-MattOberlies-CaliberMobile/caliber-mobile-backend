import Batch from '../models/batch';

const mockBatch: Batch = {
  batchTitle: '20210729 Cloud Native Matt',
  batchId: 'd614bac5-681b-47a7-8e8f-98124d9be68c',
  trainers: [
    {
      username: '64c4e6a7-7f92-4219-a4ec-f66c83e868e8',
      role: 'Admin',
    },
    {
      username: '9c3d552c-2d7d-4c78-b521-dc19fc25e397',
      role: 'Trainer',
    },
  ],
  startDate: '2021-07-29T21:17:37.786Z',
  endDate: '2022-07-29T21:17:37.786Z',
  associates: [
    {
      associateId: 'af32a3f9-e581-4d5a-ad5c-66f5a175bb3f',
      firstName: 'Dallin',
      lastName: 'Lemon',
    },
    {
      associateId: '9a9442a1-4839-423d-af00-a23672a44019',
      firstName: 'Donovan',
      lastName: 'Dixon',
    },
    {
      associateId: '75a8b566-d98c-4cc0-a072-6035d71b6635',
      firstName: 'Prem',
      lastName: 'Patel',
    },
    {
      associateId: '0f195449-5aba-482a-8789-5e3db4fc1166',
      firstName: 'Dustin',
      lastName: 'Díaz',
    },
  ],
  notes: [
    {
      noteId: 'fbd515b8-6ff3-49f7-8ce8-ba3b6a1fb8f8',
      noteContent: 'Need more review on SQL',
      technicalScore: 2,
      associate: {
        associateId: '0f195449-5aba-482a-8789-5e3db4fc1166',
        firstName: 'Dustin',
        lastName: 'Díaz',
      },
      weekNumber: 1,
    },
    {
      noteId: '8891c02f-ef52-4114-9c58-c29e3c8ebe29',
      noteContent: 'Needs more review on AWS Services',
      technicalScore: 2,
      associate: {
        associateId: '75a8b566-d98c-4cc0-a072-6035d71b6635',
        firstName: 'Prem',
        lastName: 'Patel',
      },
      weekNumber: 1,
    },
    {
      noteId: 'f3693e12-cbab-4e8d-b5e4-b2ad621993b3',
      noteContent: 'Needs more review on DynamoDB',
      technicalScore: 2,
      associate: {
        associateId: '9a9442a1-4839-423d-af00-a23672a44019',
        firstName: 'Donovan',
        lastName: 'Dixon',
      },
      weekNumber: 1,
    },
    {
      noteId: 'd517f907-91b8-42e9-b60c-dc11c726b283',
      noteContent: 'Needs more review on NoSQL',
      technicalScore: 2,
      associate: {
        associateId: 'af32a3f9-e581-4d5a-ad5c-66f5a175bb3f',
        firstName: 'Dallin',
        lastName: 'Lemon',
      },
      weekNumber: 1,
    },
    {
      noteId: 'b8210507-3ea8-4fef-a135-7ceaafbba95a',
      noteContent: 'All of them are terrible',
      technicalScore: 2,
      weekNumber: 1,
    },
  ],
};

export default mockBatch;
