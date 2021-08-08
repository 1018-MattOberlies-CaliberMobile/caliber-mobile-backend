import { handlerPath } from '@libs/handlerResolver';

type FunctionHandler = 'getBatchByYearHandler' | 'getBatchYearsHandler';

const batch = 'api/v1/batch';
const pgLayer = 'PostgresLambdaLayer';
const hanlderPath = (fun: FunctionHandler) => `${handlerPath(__dirname)}/handlers/${fun}.main`;

export const getBatchByYear = {
  handler: hanlderPath('getBatchByYearHandler'),
  layers: [
    { Ref: pgLayer },
  ],
  events: [
    {
      http: {
        method: 'get',
        path: `${batch}/year/{year}`,
        integration: 'lambda',
        cors: true,
      },
    },
  ],
};

export const getBatchYears = {
  handler: hanlderPath('getBatchYearsHandler'),
  layers: [
    { Ref: pgLayer },
  ],
  events: [
    {
      http: {
        method: 'get',
        path: `${batch}/year/`,
        integration: 'lambda',
        cors: true,
      },
    },
  ],
};
