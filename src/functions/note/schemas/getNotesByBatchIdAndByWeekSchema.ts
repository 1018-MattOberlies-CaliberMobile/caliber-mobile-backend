export default {
  type: 'object',
  properties: {
    batchId: { type: 'string' },
    weekNumber: { type: 'number' }
  },
  required: ['batchId', 'weekNumber'],
} as const;
