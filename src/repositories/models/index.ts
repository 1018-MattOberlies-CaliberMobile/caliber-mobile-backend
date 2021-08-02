import { DataTypes, Model, ModelAttributeColumnOptions } from 'sequelize';
import { Role, TechnicalScoreString } from 'src/@types';
import { db } from '../config';

const UUID_DATA_TYPE_PK: DataTypes.DataType | ModelAttributeColumnOptions<Model<any, any>> = {
  type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4,
  allowNull: false,
  primaryKey: true,
};

export const User = db.define('users', {
  userId: UUID_DATA_TYPE_PK,
  role: {
    type: DataTypes.ENUM<Role>('Trainer', 'Admin', 'QC_Analyst'),
    allowNull: false,
    defaultValue: 'Trainer',
  },
},
{
  tableName: 'users'
});

export const Note = db.define('notes', {
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
},
{
  tableName: 'notes'
});

export const Associate = db.define('associates', {
  associateId: UUID_DATA_TYPE_PK,
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
{
  tableName: 'associates'
});

export const Batch = db.define('batches', {
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
},
{
  tableName: 'batches'
});

// 1:1 for note and batch
Note.belongsTo(Batch);

// 1:1 for associate and batch
Associate.belongsTo(Batch);

// M:N for notes and associates
Note.belongsToMany(Associate, {
  through: 'note_associate',
});

Associate.belongsToMany(Note, {
  through: 'note_associate',
});

// M:N for Eleveted users and batches
User.belongsToMany(Batch, {
  through: 'user_batch',
});

Batch.belongsToMany(User, {
  through: 'user_batch',
});

db.sync({ force: true }).then(console.debug).catch(console.error)
