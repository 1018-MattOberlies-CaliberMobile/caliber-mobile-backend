import db from '../../repositories/models/'
import CognitoClient from '../../util/cognito';

class BatchDAO {
  constructor(

  ){}

  async getBatchYears(): Promise<string[]> {
    const years: string[] = (await db.Batch.findAll({
      attributes: ['startDate'],
    })).map((response) => {
      const date = response.getDataValue('startDate');
      return new Date(date).getFullYear().toString();
    });

    return [...new Set(years)];
  }

  async getBatchesByYear(year: string, token: string): Promise<any[]> {
    const user = await CognitoClient.getCognitoUser(token);

    const userRole = user.UserAttributes.find( (attr) => attr.Name === 'custom:role').Value;
    const username = user.Username;

    const batches = (await db.Batch.findAll({
      include: {
        model: db.User,
        as: 'users',
      }
    })).map((response) => response.get()); 

    const returnBatches = [];

    batches.forEach((batch) => {

      if (userRole === 'Trainer') {
        if (batch.users.find((user) => user.username === username)) {
          if(new Date(batch.startDate).getFullYear().toString() === year) {
            returnBatches.push(batch);
          }
        }
      } else {
        if(new Date(batch.startDate).getFullYear().toString() === year) {
          returnBatches.push(batch);
        }
      }
    });

    return returnBatches;
  }
}

export default new BatchDAO();
