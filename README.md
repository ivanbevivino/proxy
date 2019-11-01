# Proxy

this is a serverless stack with the following services

  - Api Gateway
  - Lambda
  - Dynamo

## Requirement

 - you need install node 10.x [Node.js](https://nodejs.org/) 
 -  you need install serverless as global  [serverless ](https://www.npmjs.com/package/serverless) 
 ```npm i serverless -g```



### Tech

proxy uses the following tecnologies:

* [AngularJS] - HTML enhanced for web apps!
* [node.js] - evented I/O for the backend
* [Gulp] - the streaming build system



### Installation
#### backend
```
cd backend
npm i 
touch .env.dev
nano .env.dev
```
- paste and replace {{VARIABLES}}
```
SERVICE=backend
PROFILE={{PROFILE}}
STAGE={{STAGE}}
REGION={{AWS_REGION}}
URL= {{URL}}
SLS_DEBUG=true
```
