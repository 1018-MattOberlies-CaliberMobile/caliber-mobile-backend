/* eslint-disable no-undef */
import { Model } from 'sequelize/types';
import BatchDAO from './batch.dao';
import CognitoClient from '../../util/cognito';
import db from '../models';

describe('batch DAO', () => {
  describe('getBatchYears', () => {
    test('returns a list of batch years', async () => {
      jest.spyOn(db.Batch, 'findAll').mockResolvedValueOnce([
        { startDate: '2021-03-08T00:00:02.000Z' },
        { startDate: '2020-05-24T04:00:00.000Z' },
      ] as unknown as Model<any, any>[]);

      await expect(BatchDAO.getBatchYears()).resolves.toEqual(['2021', '2020']);
    });

    test('if two or more batches are in the same year, the year only returns once', async () => {
      jest.spyOn(db.Batch, 'findAll').mockResolvedValueOnce([
        { startDate: '2021-03-08T00:00:02.000Z' },
        { startDate: '2021-03-08T00:00:02.000Z' },
        { startDate: '2020-05-24T04:00:00.000Z' },
      ] as unknown as Model<any, any>[]);

      await expect(BatchDAO.getBatchYears()).resolves.toEqual(['2021', '2020']);
    });
  });

  describe('getBatchesByYear', () => {
    const batch1 = {
      batchId: 'd614bac5-681b-47a7-8e8f-98124d9be68c',
      batchTitle: 'Where the streets have not name',
      startDate: '2021-02-01T00:00:02.000Z',
      endDate: '2021-12-05T00:36:38.000Z',
      createdAt: '2021-08-06T21:59:31.595Z',
      updatedAt: '2021-08-06T21:59:31.595Z',
      users: [
        {
          username: 'Trainer1',
          role: 'Trainer',
          createdAt: '2021-08-06T21:59:31.595Z',
          updatedAt: '2021-08-06T21:59:31.595Z',
        },
      ],
    };

    const batch2 = {
      batchId: 'ee8fd16f-a5e0-4518-b09f-dee6b3899a0b',
      batchTitle: '20210524 Cloud Native Matt',
      startDate: '2021-05-24T04:00:00.000Z',
      endDate: '2021-08-13T04:00:00.000Z',
      createdAt: '2021-08-08T04:00:00.000Z',
      updatedAt: '2021-08-08T04:00:00.000Z',
      users: [],
    };

    const batch3 = {
      batchId: '2a8a4c9a-d69a-4d07-9f26-2ecaa852e149',
      batchTitle: '20160505 Cool Batch Jim',
      startDate: '2016-05-05T04:00:00.000Z',
      endDate: '2016-08-10T04:00:00.000Z',
      createdAt: '2021-08-08T04:00:00.000Z',
      updatedAt: '2021-08-08T04:00:00.000Z',
      users: [],
    };

    beforeEach(() => {
      jest.spyOn(db.Batch, 'findAll').mockResolvedValueOnce([
        batch1, batch2, batch3,
      ] as unknown as Model<any, any>[]);
    });

    test('returns a list of batches for the specified year', async () => {
      jest.spyOn(CognitoClient, 'getCognitoUser').mockResolvedValueOnce({
        Username: 'Admin1',
        UserAttributes: [
          {
            Name: 'custom:role',
            Value: 'Admin',
          },
        ],
      });

      const batchList = await BatchDAO.getBatchesByYear('2021', '');
      expect(batchList).toEqual([batch1, batch2]);
    });

    test('when user is a trainer, only return batches the user is a trainer for', async () => {
      jest.spyOn(CognitoClient, 'getCognitoUser').mockResolvedValueOnce({
        Username: 'Trainer1',
        UserAttributes: [
          {
            Name: 'custom:role',
            Value: 'Trainer',
          },
        ],
      });

      const batchList = await BatchDAO.getBatchesByYear('2021', '');
      expect(batchList).toEqual([batch1]);
    });

    test('returns an empty array when no batches found for the given year', async () => {
      jest.spyOn(CognitoClient, 'getCognitoUser').mockResolvedValueOnce({
        Username: 'Admin1',
        UserAttributes: [
          {
            Name: 'custom:role',
            Value: 'Admin',
          },
        ],
      });

      const batchList = await BatchDAO.getBatchesByYear('2019', '');
      expect(batchList).toEqual([]);
    });

    test('throw an error if passed an invalid access token', () => {
      jest.spyOn(CognitoClient, 'getCognitoUser').mockImplementationOnce(() => Promise.reject(new Error()));

      expect(BatchDAO.getBatchesByYear('2021', '')).rejects;
    });
  });
});
