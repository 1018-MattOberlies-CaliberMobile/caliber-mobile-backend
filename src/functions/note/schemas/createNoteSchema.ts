export default {
  type: 'object',
  properties: {
    noteContent: { type: 'string' },
    technicalScore: { type: 'number' },
    associate: { 
      type: 'object', 
      properties: { 
        associateId: { type: 'string'},
        firstName: { type: 'string' },
        lastName: { type: 'string' },

      }},
    weekNumber: { type: 'number' },
  },
  required: ['noteContent', 'technicalScore', 'weekNumber'],
} as const;
