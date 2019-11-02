const axios = require('axios')

module.exports.proxy = async (event, context) => {
try{
console.log(` start execution ${process.env.SERVICE}-${process.env.STAGE}-proxy`)
const PATH =  event.path;
const URL = `${process.env.URL}`
console.log(`${URL}${PATH}`)
axios.get()
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify("Ok")
  }
}
catch(e){
console.log(e)
  throw 'error'
}

}
