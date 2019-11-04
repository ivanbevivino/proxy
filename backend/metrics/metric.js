const request = require('request-promise-native')
const {  config} = require('../config');
var {getQuery } = require('./querys');
var moment = require('moment');


exports.sendMetric = async (path, host, result) => {
  // let time = moment().hours(0).minutes(0).seconds(0).format("X")
  // console.log(`${time}`)
  var options = {
    method: 'POST',
    uri: `${config.elasticSearchHost}:${config.elasticSearchPort}/request/request`,
    body: {
      path: `${path}`,
      host: `${host}`,
      status: `${result}`,
      timestamp: Number(moment().format("x"))
    },
    json: true
  };

  await request(options)


}






exports.getMetric = async (id) => {
  let time = moment().hours(0).minutes(0).seconds(0).format("X")
  var options = {
    method: 'POST',
    uri: `${config.elasticSearchHost}:${config.elasticSearchPort}/request/request/_search`,
    body: JSON.parse(`${getQuery(Number(id))}`),
    json: true
  };

    return await request(options)
  

}