const {
    config
} = require('../config');
var Redis = require("ioredis");
var redis = new Redis(config.redisPort, config.redisHost)




exports.isRateExceded = async (DATA) => {
    try {
        // GET CURRENT VALUE,GET CUSTOM RATE
        res = await Promise.all([redis.get(`${DATA.PATH}`), redis.get(`maxrate${DATA.PATH}`), redis.get(`${DATA.HOST}`), redis.get(`maxrate${DATA.HOST}`), redis.get(`maxratePath`), redis.get(`maxrateHost`)])
        // IF HAVEN'T  CUSTOM PATH LIMITS  
        if (res[1]) {
            var pathLimit = res[1]
        } else {
            if (res[4]) { // IF HAVEN'T  GENERAL PATH LIMITS  SET CONFIG.MAXRATE
                var pathLimit = res[4]
            } else {
                var pathLimit = config.pathMaxRate
            }
        }
        // IF HAVEN'T  CUSTOM HOST LIMITS  
        if (res[3]) {
            var hostsLimit = res[3]
        } else {
            // IF HAVEN'T  GENERAL PATH LIMITS  SET CONFIG.MAXRATE
            if (res[5]) {
                var hostsLimit = res[5]
            } else {
                var hostsLimit = config.hostMaxRate
            }
        }
        //IF NOT EXIST PATH REDIS, SET NEW REDIS 
        if (!res[0]) {
            // redis.setex(`${DATA.PATH}`, config.maxRateTime, 1)
            writeRedis('setTtl',`${DATA.PATH}`,1, config.maxRateTime)
        }
        //IF NOT EXIST HOST REDIS, SET NEW REDIS 
        if (!res[2]) {
            // redis.setex(`${DATA.HOST}`, config.maxRateTime, 1)
            writeRedis('setTtl',`${DATA.HOST}`,1, config.maxRateTime)
        }
        // CHECK IF EXCED RATE
        if (isPathLimitExceded() || isHostLimitExceded()) {
            return true
        }
        // INCREASE CALL COUNT
        // redis.incrby(`${DATA.PATH}`, 1)
        writeRedis('increase',`${DATA.PATH}`,1)
        // redis.incrby(`${DATA.HOST}`, 1)
        writeRedis('increase',`${DATA.HOST}`,1)
        return false
    } catch (e) {
        return false
    }
    function isPathLimitExceded() {
        if (res[0] && Number(res[0]) > Number(pathLimit)) {
            return true
        } else {
            return false
        }
    }
    function isHostLimitExceded() {
        if (res[2] && Number(res[2]) > Number(hostsLimit)) {
            return true
        } else {
            return false
        }
    }
}
async function writeRedis(type, key, value, ttl) {
    switch (type) {
        case 'increase':
            redis.incrby(key, value)
            break;
        case 'setTtl':
            redis.setex(key, ttl, value)
            break;
        case 'set':
            redis.set(key, value)
            break;
        default:
            break;
    }
}




exports.setMaxRate = async (key, maxRate, ttl) => {
    if (ttl) {
        if (key == "maxrateHost") {
            redis.setex(`maxrateHost`, Number(ttl), Number(maxRate))
        } else {
            if (key == "maxratePath") {
                redis.setex(`maxratePath`, Number(ttl), Number(maxRate))
            } else {
                redis.setex(`maxrate${key}`, Number(ttl), Number(maxRate))
            }
        }
    } else {
        if (key == "maxrateHost") {
            redis.set(`maxrateHost`, Number(maxRate))
        } else {
            if (key == "maxratePath") {
                redis.set(`maxratePath`, Number(maxRate))
            } else {
                redis.set(`maxrate${key}`, Number(maxRate))
            }
        }
    }
}




exports.getMaxRate = async () => {
    var res = await redis.keys(`*maxrate*`)
    console.log(res)
    var prom = []
    for (let index = 0; index < res.length; index++) {
        const key = res[index];
        prom.push(redis.get(key))
    }
    if (prom.length) {
        var resu = await Promise.all(prom)
    }
    console.log(resu)
    var result = []
    for (let i = 0; i < resu.length; i++) {
        result.push({
            "key": res[i],
            "value": resu[i]
        })
    }
    return result
}