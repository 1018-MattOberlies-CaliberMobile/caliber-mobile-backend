/* eslint-disable class-methods-use-this */
// Can eventaully remove above rule

import Batch from 'src/models/batch';
import mockBatch from '../mock data/batch';

class BatchDAO {
  constructor(

  ){}

  async getBatchYears(): Promise<string[]> {
    return new Promise<string[]>((resolve) => {
      resolve(['2021', '2020']);
    });
  }

  async getBatchesByYear(year: string): Promise<Batch[]> {
    return new Promise<Batch[]>((resolve) => {
      const batch: Batch = {
        ...mockBatch,
        startDate: new Date(`01/01/${year}`).toISOString(),
      };
      resolve([batch]);
    });
  }
}

export default new BatchDAO();
