import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import db from '../../../repositories/models';
import Batch from '../../../models/batch';
import * as AWS from 'aws-sdk';
import { GetUserResponse } from 'aws-sdk/clients/cognitoidentityserviceprovider';

const getBatchByYearHandler: ValidatedEventAPIGatewayProxyEvent<unknown> = async (event) => {
  const year = event.path.split('/').pop();
  const AccessToken = event.headers.get['Authorization'].split(' ').pop();
  
  const cognito = new AWS.CognitoIdentityServiceProvider({region: 'us-west-1'});

  cognito.getUser({ AccessToken, }, async (err: AWS.AWSError, res: GetUserResponse) => {
    if(err) {
      return formatJSONResponse({ statusCode: 403, body: err.message});
    }
    const userRole = res.UserAttributes.find( (attr) => attr.Name === 'custom:role').Value;
    const username = res.Username;
    
    const batches: Batch[] = (await db.Batch.findAll()).map((response) => response.get()); 
    const returnBatches = [];

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

    return formatJSONResponse({
      statusCode: 200,
      body: returnBatches,
    });
  
  });

  return formatJSONResponse({
    statusCode: 500,
  });
  
  // This would be better, but it doesnt work :(
  // const res = batches.filter((batch) => {
  //   new Date(batch.startDate).toISOString().split('-').shift() === year;
  // });
  
};

export const main = middyfy(getBatchByYearHandler);
