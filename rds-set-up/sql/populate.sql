-- Users

INSERT INTO users ("username", "role", "createdAt", "updatedAt") VALUES 
  ('64c4e6a7-7f92-4219-a4ec-f66c83e868e8', 'Admin', now(), now()), 
  ('9c3d552c-2d7d-4c78-b521-dc19fc25e397', 'Trainer', now(), now());

-- Batch
INSERT INTO batches ("batchId", "batchTitle", "startDate", "endDate", "createdAt", "updatedAt") VALUES 
  ('d614bac5-681b-47a7-8e8f-98124d9be68c', 'Where the streets have not name', '2021-01-01 00:00:02', '2021-12-05 00:36:38', now(), now());

-- Associates
INSERT INTO associates ("associateId", "firstName", "lastName", "batchBatchId", "createdAt", "updatedAt") VALUES 
  ('af32a3f9-e581-4d5a-ad5c-66f5a175bb3f', 'Dallin', 'Lemon', 'd614bac5-681b-47a7-8e8f-98124d9be68c', now(), now()),
  ('9a9442a1-4839-423d-af00-a23672a44019', 'Donovan', 'Dixon', 'd614bac5-681b-47a7-8e8f-98124d9be68c', now(), now()),
  ('75a8b566-d98c-4cc0-a072-6035d71b6635', 'Prem', 'Patel', 'd614bac5-681b-47a7-8e8f-98124d9be68c', now(), now()),
  ('0f195449-5aba-482a-8789-5e3db4fc1166', 'Dustin', 'Díaz', 'd614bac5-681b-47a7-8e8f-98124d9be68c', now(), now());


-- Notes
INSERT INTO notes ("noteId", "batchBatchId", "noteContent", "technicalScore", "weekNumber", "associateAssociateId", "createdAt", "updatedAt") VALUES  
  ('fbd515b8-6ff3-49f7-8ce8-ba3b6a1fb8f8', 'd614bac5-681b-47a7-8e8f-98124d9be68c', 'Needs more review on SQL', '1', 1, '0f195449-5aba-482a-8789-5e3db4fc1166', now(), now()),
  ('8891c02f-ef52-4114-9c58-c29e3c8ebe29', 'd614bac5-681b-47a7-8e8f-98124d9be68c', 'Needs more review on AWS Services', '2', 1, '75a8b566-d98c-4cc0-a072-6035d71b6635', now(), now()),
  ('f3693e12-cbab-4e8d-b5e4-b2ad621993b3', 'd614bac5-681b-47a7-8e8f-98124d9be68c', 'Needs more review on DynamoDB', '3', 1, '9a9442a1-4839-423d-af00-a23672a44019', now(), now()),
  ('d517f907-91b8-42e9-b60c-dc11c726b283', 'd614bac5-681b-47a7-8e8f-98124d9be68c', 'Needs more review on NoSQL', '0', 1, 'af32a3f9-e581-4d5a-ad5c-66f5a175bb3f', now(), now()),
  ('b8210507-3ea8-4fef-a135-7ceaafbba95a', 'd614bac5-681b-47a7-8e8f-98124d9be68c', 'All of them are terrible', '2', 1, NULL, now(), now());

INSERT INTO user_batch ("userUsername", "batchBatchId", "createdAt", "updatedAt") VALUES 
  ('64c4e6a7-7f92-4219-a4ec-f66c83e868e8', 'd614bac5-681b-47a7-8e8f-98124d9be68c', now(), now()),
  ('9c3d552c-2d7d-4c78-b521-dc19fc25e397', 'd614bac5-681b-47a7-8e8f-98124d9be68c', now(), now());