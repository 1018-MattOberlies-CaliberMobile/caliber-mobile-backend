/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import * as AWS from 'aws-sdk';
import { GetUserRequest, GetUserResponse } from 'aws-sdk/clients/cognitoidentityserviceprovider';

class CognitoClient {
  constructor(
    private cognito = new AWS.CognitoIdentityServiceProvider({
      region: process.env.COGNITO_REGION,
    }),
  ) {
    this.cognito = cognito;
  }

  getCognitoUser = async (AccessToken: GetUserRequest['AccessToken']): Promise<GetUserResponse> => new Promise((resolve, reject) => {
    this.cognito.getUser({ AccessToken }, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  })
}

export default new CognitoClient();
