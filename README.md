# Proxy


## Requirement

 - you need install node 10.x [Node.js](https://nodejs.org/) 
 - if you want to debug install [Docker](https://docs.docker.com/install/)


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
docker run -d -p 6379:6379 redis:alpine
```
- edit config.js  {{VARIABLES}}
```
    url: "https://api.mercadolibre.com",
    maxRate:5,
    maxRateTime:20,
    redisHost:'localhost',
    redisPort:6379
```

