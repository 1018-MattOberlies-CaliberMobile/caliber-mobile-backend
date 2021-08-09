// eslint-disable-next-line import/no-extraneous-dependencies
import * as dotenv from 'dotenv';
import type { AWS } from '@serverless/typescript';
import {
  createNote,
  updateNote,
  getNotesByBatchIdAndByWeek,
  getNotesByBatchIdAndWeekOverall,
} from '@functions/note';
import {
  getBatchByYear,
  getBatchYears,
} from '@functions/batch';
import {
  getAllUsers,
  getUserById,
} from '@functions/user';
// eslint-disable-next-line no-unused-vars
dotenv.config({});

const {
  DB_NAME,
  DB_ALLOCATED_STORAGE,
  DB_INSTANCE_CLASS,
  DB_ENGINE_VERSION,
  DB_ENGINE,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_DELETE_AUTO_BACKUP,
  DB_BACKUP_RETENTION_POLICY,
  COGNITO_REGION,
} = process.env;

if (!(
  DB_NAME || DB_ALLOCATED_STORAGE || DB_INSTANCE_CLASS || DB_ENGINE_VERSION || DB_ENGINE
  || DB_USERNAME || DB_PASSWORD
)) {
  console.error('Please provide all the environment variables in the .env file');
  process.exit(-1);
}

console.debug('Database info:', DB_NAME, DB_ENGINE, DB_ALLOCATED_STORAGE, 'GiB', DB_INSTANCE_CLASS);

const serverlessConfiguration: AWS = {
  service: 'calibermobile',
  frameworkVersion: '2',
  package: {
    individually: true,
  },
  useDotenv: true,
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: {
        forceExclude: [
          'aws-sdk',
        ],
      },
    },
    // esbuild: {
    //   bundle: true,
    //   minify: true,
    //   sourcemap: true,
    //   external: [
    //     'aws-sdk',
    //     'pg',
    //     'buffer-writer',
    //     'pg-connection-string',
    //     'pg-pool',
    //     'postgres-bytea',
    //     'safe-buffer',
    //     'util-deprecate',
    //     'inherits',
    //     'pg-hstore',
    //     'pg-protocol',
    //     'postgres-date',
    //     'split2',
    //     'xtend',
    //     'packet-reader',
    //     'pg-int8',
    //     'pg-types',
    //     'postgres-interval',
    //     'string_decoder',
    //     'pgpass',
    //     'postgres-array',
    //     'readable-stream',
    //     'underscore',
    //   ],
    //   watch: {
    //     pattern: ['src/**/*'],
    //     ignore: ['.serverless/**/*', '.build', 'node_modules', '.esbuild'],
    //   },

    // },
  },
  plugins: ['serverless-webpack', 'serverless-plugin-resource-tagging'],
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
      DATABASE_NAME: DB_NAME,
      DATABASE_DIALECT: DB_ENGINE,
      DATABASE_USERNAME: DB_USERNAME,
      DATABASE_PASSWORD: DB_PASSWORD,
      DATABASE_HOST: DB_HOST,
      COGNITO_REGION,
    },
    lambdaHashingVersion: '20201221',
    stackTags: {
      'Created By': '1018-MattOberlies-CaliberMobile',
      'Resource Purpose': 'Backend for Caliber Mobile',
    },
  },

  layers: {
    postgres: {
      // path: './layer-dir',
      package: {
        artifact: './layer-dir/layer-dir.zip',
      },
      description: 'PostgreSQL layer',
      compatibleRuntimes: [
        'nodejs14.x',
      ],
      allowedAccounts: [
        '*',
      ],
    },
  },

  functions: {
    createNote,
    updateNote,
    getNotesByBatchIdAndByWeek,
    getNotesByBatchIdAndWeekOverall,

    getBatchByYear,
    getBatchYears,

    getAllUsers,
    getUserById,
  },

  resources: {
    Resources: {
      dbSecurityGroup: {
        Type: 'AWS::RDS::DBSecurityGroup',
        Properties: {
          DBSecurityGroupIngress: [
            { CIDRIP: '0.0.0.0/0' },
          ],
          GroupDescription: 'Inbound rules',
          Tags: [
            { Key: 'Purpose', Value: 'Ingress rule for caliber mobile rds database' },
          ],
        },
      },

      caliberMobileDB: {
        Type: 'AWS::RDS::DBInstance',
        Properties: {
          DBName: 'postgres',
          DBInstanceIdentifier: DB_NAME,
          DBSecurityGroups: [
            { Ref: 'dbSecurityGroup' },
          ],
          AllocatedStorage: DB_ALLOCATED_STORAGE,
          DBInstanceClass: DB_INSTANCE_CLASS,
          Engine: DB_ENGINE,
          EngineVersion: DB_ENGINE_VERSION,
          MasterUsername: DB_USERNAME,
          MasterUserPassword: DB_PASSWORD,
          BackupRetentionPeriod: DB_BACKUP_RETENTION_POLICY,
          DeleteAutomatedBackups: DB_DELETE_AUTO_BACKUP,
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
