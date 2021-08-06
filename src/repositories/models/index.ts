/* eslint-disable dot-notation */
/* eslint-disable no-param-reassign */
import { DataTypes } from 'sequelize';
import { v4 as uuid } from 'uuid';

import { Role, TechnicalScoreString } from 'src/@types';
import db from '../config';

const init = () => {
  const User = db.define('users', {
    username: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    role: {
      type: DataTypes.ENUM<Role>('Trainer', 'Admin', 'QC_Analyst'),
      allowNull: false,
      defaultValue: 'Trainer',
    },
  });

  const Note = db.define('notes', {
    noteId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    noteContent: {
      type: DataTypes.TEXT,
    },
    technicalScore: {
      type: DataTypes.ENUM<TechnicalScoreString>('0', '1', '2', '3', '4'),
      allowNull: false,
      defaultValue: '0',
    },
    weekNumber: {
      type: DataTypes.INTEGER,
    },
  });

  const Associate = db.define('associates', {
    associateId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  const Batch = db.define('batches', {
    batchId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    batchTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
    },
    endDate: {
      type: DataTypes.DATE,
    },
  });

  // 1:M
  Batch.hasMany(Note);

  // 1:1
  Note.belongsTo(Associate);

  // 1:M
  Batch.hasMany(Associate);

  // M:N for Eleveted users and batches
  User.belongsToMany(Batch, {
    through: 'user_batch',
  });

  Batch.belongsToMany(User, {
    through: 'user_batch',
  });

  // before create

  User.beforeCreate((user) => {
    user['username'] = uuid();
  });

  Note.beforeCreate((note) => {
    note['noteId'] = uuid();
  });

  Batch.beforeCreate((batch) => {
    batch['batchId'] = uuid();
  });

  Associate.beforeCreate((associate) => {
    associate['associateId'] = uuid();
  });

  return {
    User, Note, Batch, Associate,
  };
};

export default init();
