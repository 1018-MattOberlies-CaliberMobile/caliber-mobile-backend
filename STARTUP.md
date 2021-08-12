# Caliber Mobile - Startup Documentation

## Prerequisites

Some tools are needed for the backend to run:

1. [NodeJS](https://nodejs.org/),
2. [Serverless framework](https://www.serverless.com/framework/docs/),
3. [and the AWS CLI](https://aws.amazon.com/cli/).

You will also need an AWS account.

### Install NodeJS

Download NodeJS and install it: [Download NodeJS](https://nodejs.org/en/download/)

### Install Serverless

Install the Serverless Framework:

```bash
npm install -g serverless
```

Read up on Serverless here: [Serverless Documentation](https://www.serverless.com/framework/docs/)

### Install the AWS CLI

Download the CLI here: [AWS CLI Download](https://aws.amazon.com/cli/)

### Create an AWS Account

Register for an AWS account: [register](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/)

### Setup an IAM role

Setup a role with admin access. Search for the IAM service, on the left hand side under Access management select Users. Click the button Add users.

- Give it a name (e.g., `sls-caliber`)
- Select `programatic access`
- Under `Set permissions`, select `Attach existing policies directly`
- Select `AdministratorAccess`
- Click Next
- Set some tags
- Create user

It should provide you with an access key id and secret key, these will be used for the aws cli in the following step.

### Configure the IAM role

Set-up the aws profile

```bash
aws configure --profile sls-caliber
```

## Setting up the backend

Clone the repository

```bash
git clone https://github.com/1018-MattOberlies-CaliberMobile/caliber-mobile-backend.git
```

Change directory to the cloned repository

```bash
cd caliber-mobile-backend
```

Create the .env file:

```bash
cp .env.example .env
```

Worry about the `DB_USERNAME` and `DB_PASSWORD`, you'll have to set-up the `DB_HOST` once the backend's been deployed.

Install the packages that will be used by the backend:

```bash
npm install && cd layer-dir && npm install
```

## Deploy

Deploy the backend:

> Note: the following command will create resources in your AWS account; and you might be charged for the aforementioned resources (during their lifespan).

```bash
AWS_PROFILE=sls-caliber sls deploy
```

Once that's been deployed, you'll need to get the endpoint of the RDS Instance. Once you have that, add the endpoint to the `DB_HOST` inside the `.env` file.

Redeploy everything:

```bash
AWS_PROFILE=sls-caliber sls deploy
```
