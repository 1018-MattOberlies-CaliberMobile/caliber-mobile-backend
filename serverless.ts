import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';

const serverlessConfiguration: AWS = {
  service: 'caliber-mobile-backend',
  frameworkVersion: '2',
  custom: {
    esbuild: {
      bundle: true,
      minify: true,
      sourcemap: true,
      external: [
        'aws-sdk'
      ],
      watch: {
        pattern: ['src/**/*'],
        ignore: ['.serverless/**/*', '.build', 'node_modules', '.esbuild'],
      },
    },
  },
  plugins: ['serverless-esbuild', 'serverless-plugin-resource-tagging'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { hello },
  resources: {
    Resources: {

      "DBSecurityGroup": {
        "Type": "AWS::RDS::DBSecurityGroup",
        "Properties": {
          "DBSecurityGroupIngress": { "EC2SecurityGroupName": { "Ref": "WebServerSecurityGroup" } },
          "GroupDescription": "Frontend Access"
        }
      },
      caliberMobileDB: {
        Type: 'AWS::RDS::DBInstance',
        Properties: {
          'DBSecurityGroups': [
            {
              'Ref': 'MyDbSecurityByEC2SecurityGroup'
            },
            {
              'Ref': 'MyDbSecurityByCIDRIPGroup'
            }
          ],
          AllocatedStorage: '5',
          DBInstanceClass: 'db.m1.small',
          Engine: 'PostgreSQL',
          MasterUsername: 'MyName',
          MasterUserPassword: 'MyPassword',
        },
      },
    },
  },
};

export default serverlessConfiguration;
