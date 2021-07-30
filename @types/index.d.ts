export type TechincalScore = 0 | 1 | 2 | 3 | 4;
export type Role = 'Trainer' | 'QC_Analyst' | 'Admin'

export type Note = {
  noteId: string,
  batch: Batch,
  noteContent: string,
  technicalScore: TechincalScore,
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
  username: string,
  role: Role,
};

export type Associate = {
  associateId: string,
  firstName: string,
  lastName: string,
};
