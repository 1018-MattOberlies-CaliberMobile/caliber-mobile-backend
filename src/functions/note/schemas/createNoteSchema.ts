export default {
  type: 'object',
  properties: {
    noteId: { type: 'string' },
    noteContent: { type: 'string' },
    technicalScore: { type: 'number' },
    batchId: { type: 'string' },
    associate: {
      type: 'object',
      properties: {
        associateId: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
      },
    },
    weekNumber: { type: 'number' },
  },
  required: ['batchId', 'noteContent', 'technicalScore', 'weekNumber'],
} as const;
