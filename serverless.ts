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
} from '@functions/batch';

import {
  getAllUsers,
  createUser,
  updateUser,
  getUserById,
} from '@functions/user';

dotenv.config({});

const { DB_USERNAME, DB_PASSWORD } = process.env;

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
          DBSecurityGroups: [
            { Ref: 'dbSecurityGroup' },
          ],
          AllocatedStorage: '20',
          DBInstanceClass: 'db.t2.micro',
          Engine: 'postgres',
          MasterUsername: DB_USERNAME,
          MasterUserPassword: DB_PASSWORD,

          // delete in prod
          BackupRetentionPeriod: 0,
          DeleteAutomatedBackups: true,
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
