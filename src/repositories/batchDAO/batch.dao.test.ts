/* eslint-disable no-undef */
import BatchDAO from './batch.dao';
import CognitoClient from '../../util/cognito';
import db from '../models';
import { Model } from 'sequelize/types';


describe('batch DAO', () => {

  describe('getBatchYears', () => {
    test('returns a list of batch years', async () => {
      jest.spyOn(db.Batch, 'findAll').mockResolvedValueOnce([
        { startDate: '2021-03-08T00:00:02.000Z'},
        { startDate: '2020-05-24T04:00:00.000Z'}
      ] as unknown as Model<any, any>[]);

      await expect(BatchDAO.getBatchYears()).resolves.toEqual(expect.arrayContaining(['2021', '2020']));
    });

    test('if two or more batches are in the same year, the year only returns once', async () => {
      jest.spyOn(db.Batch, 'findAll').mockResolvedValueOnce([
        { startDate: '2021-03-08T00:00:02.000Z'},
        { startDate: '2021-03-08T00:00:02.000Z'},
        { startDate: '2020-05-24T04:00:00.000Z'}
      ] as unknown as Model<any, any>[]);

      await expect(BatchDAO.getBatchYears()).resolves.toEqual(expect.arrayContaining(['2021', '2020']));
    })
  });

  describe('getBatchesByYear', () => {
    test('returns a list of batches for the specified year', async () => {
      jest.spyOn(CognitoClient, 'getCognitoUser').mockResolvedValueOnce({
        Username: 'Admin1',
        UserAttributes: [
          {
            Name: 'custom:role',
            Value: 'Admin',
          } 
        ]
      });

      const year = '2021'
      const batchList = await BatchDAO.getBatchesByYear(year, '');
      const returnedYear = batchList[0].startDate.getFullYear();
      expect(Number(returnedYear)).toEqual(Number(year));
    });

    test('when user is a trainer, only return batches the user is a trainer for', async () => {
      jest.spyOn(CognitoClient, 'getCognitoUser').mockResolvedValueOnce({
        Username: 'Trainer1',
        UserAttributes: [
          {
            Name: 'custom:role',
            Value: 'Trainer',
          } 
        ]
      });

      const year = '2021'
      const batchList = await BatchDAO.getBatchesByYear(year, '');
      expect(batchList.length).toBeGreaterThan(0);
      batchList.forEach((batch) => {
        const trainer = batch.users.find((t) => t.getDataValue('username') === 'Trainer1');
        expect(trainer).toBeDefined();
      })
    });

    test('throw an error if passed an invalid access token', () => {
      jest.spyOn(CognitoClient, 'getCognitoUser').mockImplementationOnce(() => Promise.reject(new Error()));

      expect(BatchDAO.getBatchesByYear('2021', '')).rejects;
    })
  });
});
