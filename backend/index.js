const {
    config
} = require('./config');
var {
    rateExceded
} = require('./helpers/rate')


const express = require('express')
const request = require('request-promise-native')
const app = express()



app.get('*', async (req, res) => {
    console.log(`////////////////////// START REQUEST /////////////////////////`)
    const DATA = {
        URL: req.path ? config.url + req.path : config.url,
        PATH: req.path,
        HOST: req.headers.host
    }


    try {
        if (await rateExceded(DATA)) {
            res.status(403).jsonp({
                "message": "Rate Exceded",
                "error": "Forbiden",
                "status": 403,
                "cause": []
            })
            console.log(`////////////////////// END REQUEST /////////////////////////`)
        }
        const result = await request(DATA.URL)
        res.json(JSON.parse(result))
        console.log(`////////////////////// END REQUEST /////////////////////////`)

    } catch (e) {

        if (e.response && e.response.body) {
            console.log(e.response.body.status)
            let body = JSON.parse(e.response.body)
            body.status ? res.status(body.status).jsonp(body) : res.status(500).jsonp(body)
            console.log(`////////////////////// END REQUEST /////////////////////////`)

        }
        res.json(e)
        console.log(`////////////////////// END REQUEST /////////////////////////`)
    }

});



app.listen(3000, function () {
    console.log('listening on port 3000!');
});