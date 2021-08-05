import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import db from '../../../repositories/models';
import Batch from '../../../models/batch';
import * as AWS from 'aws-sdk';
import { GetUserRequest, GetUserResponse } from 'aws-sdk/clients/cognitoidentityserviceprovider';

const getBatchByYearHandler: ValidatedEventAPIGatewayProxyEvent<unknown> = async (event) => {
  const year = event.path['year'];
  const AccessToken = event.headers['Authorization'].split(' ').pop();
  
  const cognito = new AWS.CognitoIdentityServiceProvider({region: 'us-west-1'});

  const getCognitoUser = async (AccessToken: GetUserRequest["AccessToken"]): Promise<GetUserResponse> => {
    return new Promise((resolve, reject) => {
      cognito.getUser({ AccessToken, }, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    })
  }

  try {
    const user = await getCognitoUser(AccessToken);

    const userRole = user.UserAttributes.find( (attr) => attr.Name === 'custom:role').Value;
    const username = user.Username;

    const batches: Batch[] = (await db.Batch.findAll()).map((response) => response.get()); 

    const returnBatches: Batch[] = [];

    batches.forEach((batch) => {

      if ((userRole === 'Trainer' && batch.trainers.find((trainer) => trainer.username === username))) {
        if(new Date(batch.startDate).getFullYear().toString() === year) {
          returnBatches.push(batch);
        }
      } else {
        if(new Date(batch.startDate).getFullYear().toString() === year) {
          returnBatches.push(batch);
        }
      }
    });

    return formatJSONResponse({ batches: returnBatches });
  } catch (err) {
    return {statusCode: 500, body: err.message }
  }

  // This would be better, but it doesnt work :(
  // const res = batches.filter((batch) => {
  //   new Date(batch.startDate).toISOString().split('-').shift() === year;
  // });
  
};

export const main = middyfy(getBatchByYearHandler);
