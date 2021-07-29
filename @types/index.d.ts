export type Note = {
  noteId: string,
  batch: Batch,
  noteContent: string,
  technicalScore: '0' | '1' | '2' | '3' | '4',
  associate?: Associate,
  weekNumber: number,
};

export type Batch = {
  batchId: string,
  trainers: User[],
  startDate: string,
  endDate: string,
  batchTitle: string,
  associateList: Associate[],
  notes: Note[],
};

export type User = {
  userId: string,
  role: 'Trainer' | 'QC_Analyst' | 'Admin',
};

export type Associate = {
  associateId: string,
  firstName: string,
  lastName: string,
};
