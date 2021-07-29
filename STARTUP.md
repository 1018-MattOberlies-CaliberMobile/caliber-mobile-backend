
Install serverless
```
```

Set-up an admin role in aws
```
```

Clone the repo
```
git clone ...
```

Install the packages

```
npm install
```

Set-up the `.env` file (use `.env.example` in root dir)

Deploy the Cloudformation Template
```
sls deploy
```

Create the database
```
npm run db:create
```

IF AND ONLY IF you need to reset the databse
```
npm run db:reset
```
> This will drop all the tables created and create them

