/* eslint-disable no-undef */
import BatchDAO from './batch.dao';

describe('batch DAO', () => {
  describe('getBatchYears', () => {
    test('returns a list of batch years', async () => {
      await expect(BatchDAO.getBatchYears()).resolves.toBe(['2021', '2020']);
    });
  });

  describe('getBatchesByYear', () => {
    test('returns a list of batches for the specified year', async () => {
      const year = Math.floor(Math.random() * 1000).toString();
      // TODO: Mock cognito
      const batchList = await BatchDAO.getBatchesByYear(year, '');
      const returnedYear = batchList[0].startDate.split('-').shift();
      expect(Number(returnedYear)).toEqual(Number(year));
    });
  });
});
