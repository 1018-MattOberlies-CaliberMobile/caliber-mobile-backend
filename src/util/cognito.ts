import * as AWS from 'aws-sdk';
import { GetUserRequest, GetUserResponse } from 'aws-sdk/clients/cognitoidentityserviceprovider';

class CognitoClient {
  constructor(
    private cognito = new AWS.CognitoIdentityServiceProvider({region: 'us-west-1'}),
  ){}

  getCognitoUser = async (AccessToken: GetUserRequest["AccessToken"]): Promise<GetUserResponse> => {
    return new Promise((resolve, reject) => {
      this.cognito.getUser({ AccessToken, }, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    })
  }
}

export default new CognitoClient();
