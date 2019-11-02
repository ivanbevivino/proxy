const {   config} = require('../config');
var Redis = require("ioredis");
var redis = new Redis(config.redisPort,config.redisHost)
exports.rateExceded = async (DATA) => {
    try {
        
        res = await redis.get(`${DATA.PATH}`)
        if (!res) {


            redis.setex(`${DATA.PATH}`, config.maxRateTime, 1)
            return false;
        }
        if (res && res > config.maxRate) {
            return true
        }

        redis.incrby(`${DATA.PATH}`, 1)
        return false


    } catch (e) {
        return false
    }








}