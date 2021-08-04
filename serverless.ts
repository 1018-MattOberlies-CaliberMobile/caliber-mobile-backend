/* eslint-disable import/no-extraneous-dependencies */
import * as dotenv from 'dotenv';
import type { AWS } from '@serverless/typescript';

import {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
  getNotesByBatchIdAndByWeek,
  getNotesByBatchId,
  getNotesByBatchIdAndWeekOverall,
  getNotesByAssociate,
} from '@functions/note';

import {
  createAssociate,
  deleteAssociateById,
  getAllAssociate,
  getAssociateByBatchId,
  getAssociateById,
  updateAssociate,
} from '@functions/associate';

import {
  getAllBatches,
  createBatch,
  updateBatch,
  getBatchById,
  deleteBatchById,
  getBatchByYear,
  getBatchYears,
} from '@functions/batch';

import {
  getAllUsers,
  createUser,
  updateUser,
  getUserById,
} from '@functions/user';

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
} = process.env;

if (!(
  DB_NAME || DB_ALLOCATED_STORAGE || DB_INSTANCE_CLASS || DB_ENGINE_VERSION || DB_ENGINE || DB_USERNAME || DB_PASSWORD
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
    profile: 'sls-caliber-2',
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
    },
    lambdaHashingVersion: '20201221',
    stackTags: {
      'Created By': '1018-MattOberlies-CaliberMobile',
      'Resource Purpose': 'Backend for Caliber Mobile',
    },
    // iam: {
    //   role: 'arn:aws:iam::855430746673:role/cloud-native-lambda-execution-role',
    // },
  },

  functions: {
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,
    deleteNote,
    getNotesByBatchIdAndByWeek,
    getNotesByBatchId,
    getNotesByBatchIdAndWeekOverall,
    getNotesByAssociate,

    createAssociate,
    getAllAssociate,
    getAssociateById,
    deleteAssociateById,
    updateAssociate,
    getAssociateByBatchId,

    getAllBatches,
    createBatch,
    updateBatch,
    getBatchById,
    deleteBatchById,
    getBatchByYear,
    getBatchYears,

    getAllUsers,
    createUser,
    updateUser,
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