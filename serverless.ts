import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';

const serverlessConfiguration: AWS = {
  service: 'caliber-mobile-backend',
  frameworkVersion: '2',
  package: {
    individually: true,
  },
  custom: {
    esbuild: {
      bundle: true,
      minify: true,
      sourcemap: true,
      external: [
        'aws-sdk',
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
    region: 'us-east-1',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
    stackTags: {
      'Created By': '1018-MattOberlies-CaliberMobile',
      'Delete After': 'never',
      'Contact Before Delete': '1018-MattOberlies-CaliberMobile',
      Purpose: 'Backend for Caliber Mobile',
    },
    // iam: {

    // },
  },
  // import the function via paths
  functions: { hello },
  resources: {
    Resources: {
      // InboundRules: {
      //   Type: 'AWS::RDS::DBSecurityGroup::Ingress',
      //   Properties: {

      //     IpProtocol: 'tcp',
      //     FromPort: '5432',
      //     ToPort: '5432',
      //     CidrIp: '0.0.0.0/0',

      //   },
      // },
      WebServerSecurityGroup: {
        Type: 'AWS::EC2::SecurityGroup',
        Properties: {
          GroupDescription: 'Enable HTTP access via port 80, SSH access, and PostgreSQL access',
          SecurityGroupIngress: [
            {
              IpProtocol: 'tcp', FromPort: '80', ToPort: '80', CidrIp: '0.0.0.0/0',
            },
            {
              IpProtocol: 'tcp', FromPort: '22', ToPort: '22', CidrIp: '0.0.0.0/0',
            },
            {
              IpProtocol: 'tcp', FromPort: '5432', ToPort: '5432', CidrIp: '0.0.0.0/0',
            },
          ],
        },
      },
      dbSecurityGroup: {
        Type: 'AWS::RDS::DBSecurityGroup',
        Properties: {
          DBSecurityGroupIngress: {
            EC2SecurityGroupName: {
              Ref: 'WebServerSecurityGroup',
            },
          },
          GroupDescription: 'Inbound rules',
        },
      },

      caliberMobileDB: {
        Type: 'AWS::RDS::DBInstance',
        Properties: {
          VPCSecurityGroups: [
            { Ref: 'WebServerSecurityGroup' },
          ],
          DBSecurityGroups: [
            { Ref: 'dbSecurityGroup' },
          ],
          AllocatedStorage: '20',
          DBInstanceClass: 'db.t2.micro',
          Engine: 'postgres',
          MasterUsername: 'postgres',
          MasterUserPassword: 'password',
          // delete in prod
          BackupRetentionPeriod: 0,
          DeleteAutomatedBackups: true,

        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
