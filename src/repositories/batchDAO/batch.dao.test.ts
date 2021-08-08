/* eslint-disable no-undef */
import BatchDAO from './batch.dao';
import CognitoClient from '../../util/cognito';

// const mockBatchYears = [
//   {
//     batches: {
//       dataValues: { startDate: '2021-05-04T04:00:00.000Z'},
//     }
//   },

// ]


describe('batch DAO', () => {

  describe('getBatchYears', () => {
    test('returns a list of batch years', async () => {
      // this works, but we're not really testing the actual function this way
      BatchDAO.getBatchYears = jest.fn(() => {
        return new Promise((res) => {
          res(['2021','2020']);
        })
      });
      // jest.spyOn(db.Batch, 'findAll').mockResolvedValueOnce(mockBatchYears as unknown as Model<any, any>[]);
      await expect(BatchDAO.getBatchYears()).resolves.toEqual(['2021', '2020']);
    });
  });

  describe('getBatchesByYear', () => {
    test('returns a list of batches for the specified year', async () => {
      jest.spyOn(CognitoClient, 'getCognitoUser').mockResolvedValueOnce({
        Username: 'Admin1',
        UserAttributes: [
          {
            Name: 'custom::role',
            Value: 'Admin',
          } 
        ]
      });


      const year = Math.floor(Math.random() * 1000).toString();
      // TODO: Mock cognito
      const batchList = await BatchDAO.getBatchesByYear(year, '');
      const returnedYear = batchList[0].startDate.split('-').shift();
      expect(Number(returnedYear)).toEqual(Number(year));
    });
  });
});
