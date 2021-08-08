#!/bin/bash
export DATABASE_USERNAME=postgres
export DATABASE_PASSWORD=password
export DATABASE_HOST=calibermobile.cxsmj4yjxslf.us-east-1.rds.amazonaws.com 
export DATABASE_DIALECT=postgres 
export TESTING=1
npx jest --coverage