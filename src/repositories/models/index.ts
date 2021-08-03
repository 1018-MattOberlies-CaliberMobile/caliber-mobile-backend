import { DataTypes, Model, ModelAttributeColumnOptions } from 'sequelize';
import { v4 as uuid } from 'uuid';

import { Role, TechnicalScoreString } from 'src/@types';
import db from '../config';

const init = () => {
  const UUID_DATA_TYPE_PK: DataTypes.DataType | ModelAttributeColumnOptions<Model<any, any>> = {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  };

  const User = db.define('users', {
    username: UUID_DATA_TYPE_PK,
    role: {
      type: DataTypes.ENUM<Role>('Trainer', 'Admin', 'QC_Analyst'),
      allowNull: false,
      defaultValue: 'Trainer',
    },
  });

  const Note = db.define('notes', {
    noteId: UUID_DATA_TYPE_PK,
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
    associateId: UUID_DATA_TYPE_PK,
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
    batchId: UUID_DATA_TYPE_PK,
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

  // 1:1 for note and batch
  Note.belongsTo(Batch);

  // 1:1 for associate and batch
  Associate.belongsTo(Batch);

  // M:N for notes and associates
  Note.belongsToMany(Associate, {
    through: 'notes_associate',
  });

  Associate.belongsToMany(Note, {
    through: 'notes_associate',
  });

  // M:N for Eleveted users and batches
  User.belongsToMany(Batch, {
    through: 'users_batch',
  });

  Batch.belongsToMany(User, {
    through: 'users_batch',
  });

  // before create

  User.beforeCreate((user) => {
    user['username'] = uuid();
  });

  Note.beforeCreate((batch) => {
    batch['noteId'] = uuid();
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