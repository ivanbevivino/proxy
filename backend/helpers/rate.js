const {
    config
} = require('../config');
var Redis = require("ioredis");
var redis = new Redis(config.redisPort, config.redisHost)


exports.isRateExceded = async (DATA) => {
    try {
        // GET CURRENT VALUE,GET CUSTOM RATE
        res = await Promise.all([redis.get(`${DATA.PATH}`), redis.get(`maxrate${DATA.PATH}`), redis.get(`${DATA.HOST}`), redis.get(`maxrate${DATA.HOST}`)])
        // IF HAVEN'T  CUSTOM PATH LIMITS  SET CONFIG.MAXRATE
        var pathLimit = res[1] ? res[1] : config.pathMaxRate
        var hostsLimit = res[3] ? res[3] : config.hostMaxRate
        //IF NOT EXIST PATH REDIS, SET NEW REDIS 
        if (!res[0]) {
            redis.setex(`${DATA.PATH}`, config.maxRateTime, 1)
        }
        //IF NOT EXIST HOST REDIS, SET NEW REDIS 
        if (!res[2]) {
            redis.setex(`${DATA.HOST}`, config.maxRateTime, 1)
        }
        // CHECK IF EXCED RATE
        if (isPathLimitExceded() || isHostLimitExceded()) {
            return true
        }
        // INCREASE CALL COUNT
        redis.incrby(`${DATA.PATH}`, 1)
        redis.incrby(`${DATA.HOST}`, 1)
        return false
    } catch (e) {
        return false
    }


    function isPathLimitExceded() {
        console.log(res[0], pathLimit)
        if (res[0] && res[0] > pathLimit) {
            return true
        } else {
            return false
        }
    }
    
    
    function isHostLimitExceded() {
        console.log(res[2], hostsLimit)
        if (res[2] && res[2] > hostsLimit) {
            return true
        } else {
            return false
        }
    }


}

exports.setMaxRate = async (key,maxRate) => {
    redis.set(`maxrate${key}`, maxRate)

}