-- CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TYPE ROLE AS ENUM ('QC_Analyst', 'Admin', 'Trainer');

CREATE TABLE IF NOT EXISTS users (
	user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	role ROLE NOT NULL DEFAULT 'Trainer'
);

CREATE TABLE IF NOT EXISTS batch (
	batch_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	batch_title VARCHAR(255) NOT NULL DEFAULT 'No title',
	start_date DATE NOT NULL DEFAULT now(),
	end_date DATE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_batch (
	batch_id UUID REFERENCES public.batch (batch_id),
	user_id UUID REFERENCES public.users (user_id),
	PRIMARY KEY(batch_id, user_id)
);

CREATE TABLE IF NOT EXISTS associate (
	associate_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	first_name VARCHAR(45) NOT NULL,
	last_name VARCHAR(45) NOT NULL,
	batch_id UUID NOT NULL REFERENCES public.batch (batch_id)
);

CREATE TYPE SCORE AS ENUM ('0', '1', '2', '3', '4');

CREATE TABLE IF NOT EXISTS note (
	note_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	note_content TEXT,
	technical_score SCORE NOT NULL DEFAULT '0',
	week_number INT NOT NULL DEFAULT 0,
	batch_id UUID NOT NULL REFERENCES public.batch (batch_id)
);

CREATE TABLE IF NOT EXISTS note_associate (
	note_id UUID REFERENCES public.batch (batch_id),
	associate_id UUID REFERENCES public.associate (associate_id),
	PRIMARY KEY(note_id, associate_id)
);