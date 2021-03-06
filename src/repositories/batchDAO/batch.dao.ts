import User from 'src/models/user';
import db from '../models';
import CognitoClient from '../../util/cognito';

class BatchDAO {
  static async getBatchYears(): Promise<string[]> {
    const years = (await db.Batch.findAll({
      attributes: ['startDate'],
    })).map((response) => {
      const res = JSON.parse(JSON.stringify(response));
      const date = res.startDate;
      return new Date(date).getFullYear().toString();
    });

    return [...new Set(years)];
  }

  static async getBatchesByYear(year: string, token: string): Promise<any[]> {
    const user = await CognitoClient.getCognitoUser(token);

    const userRole = user.UserAttributes.find((attr) => attr.Name === 'custom:role').Value;
    const username = user.Username;

    const batches = (await db.Batch.findAll({
      include: [
        {
          model: db.User,
          as: 'users',
        },
        {
          model: db.Associate,
          as: 'associates',
        },
      ],
    })).map((response) => JSON.parse(JSON.stringify(response)));

    const returnBatches = [];

    batches.forEach((batch) => {
      if (userRole === 'Trainer') {
        if (batch.users.find((u: User) => u.username === username)) {
          if (new Date(batch.startDate).getFullYear().toString() === year) {
            returnBatches.push(batch);
          }
        }
      } else if (new Date(batch.startDate).getFullYear().toString() === year) {
        returnBatches.push(batch);
      }
    });
    return returnBatches;
  }
}

export default BatchDAO;
