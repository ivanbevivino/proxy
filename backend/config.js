var config = {
    url: "https://api.mercadolibre.com",
    pathMaxRate:5,
    hostMaxRate:1000,
    maxRateTime:120,
    redisHost:'localhost',
    redisPort:6379,
    elasticSearchHost:'http://localhost',
    elasticSearchPort: 9200
};
exports.config = config;