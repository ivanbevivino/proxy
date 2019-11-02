var Redis = require("ioredis");
var redis = new Redis(32768);
exports.rateExceded = async (DATA) => {
    // return false
    try{

        console.log(`REDIS`)
        // var res = 1
         res = await redis.get(`${DATA.PATH}`)
             console.log(res)
             if (!res) {
                 console.log(`${DATA.PATH}`, 10, 1)
     
                 redis.setex(`${DATA.PATH}`, 10, 1)
                 return false;
             }
             if (res && res > 2) {
                 console.log('a')
                 return true
             } 
             
             redis.incrby(`${DATA.PATH}`,1)
             return false

        
    }catch (e){ return false}
        




    


}