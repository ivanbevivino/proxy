# Proxy


## Requirement

 - you need install node 10.x [Node.js](https://nodejs.org/) 
 - you need install [Docker](https://docs.docker.com/install/)
 - you need install [Gulp](https://gulpjs.com/)
```
npm install -g gulp-cli
npm install gulp -D
```
 - you need install [bower](https://bower.io/)
``` 
npm install -g bower
```


### Tech

proxy uses the following tecnologies:

#### frontend

* [AngularJS] - HTML enhanced for web apps!
* [Gulp] - the streaming build system

#### backend

* [node.js] - backend
* [ElasticSearch] - metrics & statistics
* [Redis] -  rate control


### Develop


#### Docker
```
sudo sysctl -w vm.max_map_count=262144
docker run -d -p 6379:6379 redis:alpine
docker run -d -p 9200:9200 -p 9300:9300 elasticsearch:6.7.2

```

#### Backend
- Install dependencies
```
cd backend
npm i 

```
- Edit config.js  {{VARIABLES}} for deafult values
```
nano config.js 
```
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
- Run
```
node index.js
```

#### Frontend
- Install dependencies
```
cd frontend
npm i 
bower i


```
- Edit backend endpoint  
```
 nano app/constants/api-url-constant.js 

```
```
    .constant('API_URL', {
      "API_BACKEND": "http://127.0.0.1:3000/",
      "API_REPORTS": "http://127.0.0.1:3000/",
    }) 


```
- Run

```
gulp

```