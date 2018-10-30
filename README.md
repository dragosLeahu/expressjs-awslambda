# Serverless-ExpressJs-MongoDB REST API Boilerplate

### Prerequisites
- AWS account with access to IAM and Lambda (AWSLambdaFullAccess, IAMFullAccess, AmazonAPIGatewayAdministrator)
- AWS CLI configured
    1. Download and install aws cli from https://aws.amazon.com/cli/
    2. Here is how to install aws cli on linux easier (might work almost the same on mac): https://gist.github.com/anamorph/aaf8434d3bbad92059b3
    3. Use `aws configre` and add the ID and Secret from AWS IAM Console, region (default eu-central-1) and set output to json.
- Node.js 8
- [MongoDB Community Edition for local development](https://docs.mongodb.com/manual/installation/)

### Installation and setup
**1.** In the *package.json* file:
- change *name* to your application name.

## Setting and running in local environtment for the first time:
**1.** Copy .env.example as .env and add your variables. Note that .env file is not required for production beacuse the environtmanet variables will be set through AWS console.

**3.** Run `npm install` to install all the required dependencies.

**4.** Run `mongod` in your terminal to start the local database server.

**5.** Run `npm start` and choose `local` to start node server.

## Setting and deploying to AWS for the first time:
**1.** In the *package.json* file:
- at *scripts -> deploy*, change *--region* to match your selected region from the AWS Lambda.

**4.** Run `npm start` and select `create-app` to deploy your application to AWS Lambda for the first time.

**5.** Use `npm start` and `deploy-dev` or `deploy-prod` to updated the changes.

### Usage
**Use `npm start` to open a menu with available run methods:**
1. `local` -> runs a nodemon local server on localhost:3000.
2. `watch` -> runs mocha watch for testing
3. `create-app` -> this should be ran only the first time to deploy and create a **development** stage of the project to AWS, after it run `update` to deploy changes.
4. `deploy-dev` -> deploy changes to AWS Lambda with version dev.
5. `deploy-prod` -> deploy changes to AWS Lambda with version prod.
5. `test` -> runs all the tests once and exits (used by CircleCI)
5. `start` -> show npm task list menu, use to be able to choose a command from the ones above.

### Notes
1. **In the *.npmignore* file we can specify the files that we don't want to deploy on AWS.