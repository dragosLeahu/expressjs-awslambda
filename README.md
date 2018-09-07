# Serverless-ExpressJs-MongoDB REST API Boilerplate

## Prerequisites
- AWS account with access to IAM and Lambda (AWSLambdaFullAccess, IAMFullAccess, AmazonAPIGatewayAdministrator)
- [AWS CLI configured with *default* user.](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html) [More info from ClaudiaJS documentation here.](https://claudiajs.com/tutorials/installing.html)
- Node.js 6 or 8
- NPM

## Installation and setup
**1.** Create a *variables.env* file where you will add the connection string for MongoDB [here's how you can get the connection string](https://hackernoon.com/building-a-serverless-rest-api-with-node-js-and-mongodb-2e0ed0638f47#0027).
  - The connection string should look like this in the *variables.env*: **DB=mongodb://`USERNAME`:`PASSWORD`@express-awslambda-shard-00-00-9pqtu.mongodb.net:27017,express-awslambda-shard-00-01-9pqtu.mongodb.net:27017,express-awslambda-shard-00-02-9pqtu.mongodb.net:27017/test?ssl=true&replicaSet=express-awslambda-shard-0&authSource=admin&retryWrites=true**

**2.** Run `npm install` to install all the required dependencies.

**3.** In the *package.json* file:
- *scripts -> deploy*, change *--region* to your selected region from the AWS Lambda.
- change *name* to your application name.

## Usage
**Use `npm start` to open a menu with available run methods:**
1. `local` -> runs a *nodemon* local server for testing on localhost:3000.
2. `update` -> deploy changes to AWS Lambda.
3. `deploy` -> this should be ran only the first time to deploy and create a **development** stage of the project to AWS, after it run `update` to deploy changes.
4. `release` -> deploy the last **development** stage as **production/live** on AWS.
5. `start` -> used to be able to run `npm start` and show this menu in the cmd.

### Notes
1. The *.npmignore* file needs to be in the project even if it is empty, because it overrides the *.gitignore* file and this is needed while deploying to AWS Lambda. By default ClaudiaJS ignores files from *.gitignore* when packaging the zip for deployment. This leads to the file *variables.env* not being deployed, because it is listed in the *.gitignore* file. If we have the *.npmignore* file in the root of the project, then at deployment it will override the *.gitignore* file and let the *variables.env* file to be deployed. 
