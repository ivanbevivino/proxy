# Proxy


## Requirement

 - you need install node 10.x [Node.js](https://nodejs.org/) 
 - if you want to debug install [Docker](https://docs.docker.com/install/)


### Tech

proxy uses the following tecnologies:

frontend
* [AngularJS] - HTML enhanced for web apps!
* [Gulp] - the streaming build system
backend

* [node.js] - backend
* [ElasticSearch] - metrics & statistics
* [Redis] -  rate control


### Installation
#### backend
```
cd backend
npm i 
docker run -d -p 6379:6379 redis:alpine
docker run -d -p 9200:9200 -p 9300:9300 elasticsearch:6.7.2

```
- edit config.js  {{VARIABLES}} for deafult values
```
    url: "https://api.mercadolibre.com",
    pathMaxRate:5,
    hostMaxRate:1000,
    maxRateTime:120,
    redisHost:'localhost',
    redisPort:6379,
    elasticSearchHost:'http://localhost',
    elasticSearchPort: 9200
```

