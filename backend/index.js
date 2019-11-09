const {
    config
} = require('./config');
var {
    isRateExceded,
    setMaxRate,
    getMaxRate
} = require('./helpers/rate')
var {
    sendMetric,
    getMetric
} = require('./metrics/metric')
const express = require('express')
const request = require('request-promise-native')
const app = express()
var cors = require('cors')



app.use(cors())



app.use(express.json())



app.use(express.urlencoded({
    extended: true
}))
////////// CUSTOM GET'S ///////////////



app.get('/getConfig', async (req, res) => {
    try {
        var result = await getMaxRate()
        res.json(result)
    } catch (e) {
        res.status(500).jsonp(e)
    }
});
////////// REVERSE PROXY  ///////////////



app.get('*', async (req, res) => {
    console.log(`////////////////////// START REQUEST /////////////////////////`)
    const DATA = {
        URL: req.path ? config.url + req.path : config.url,
        PATH: req.path,
        HOST: req.headers.host
    }
    try {
        // console.log(`========================== REDIS REQUEST  ======================`)
        if (await isRateExceded(DATA)) {
            // console.log(`========================== REDIS REQUEST END ======================`)
            res.status(403).jsonp({
                "message": "Rate Exceded",
                "error": "Forbiden",
                "status": 403,
                "cause": []
            })
             sendMetric(DATA.PATH, DATA.HOST, 403)
            console.log(`////////////////////// END REQUEST /////////////////////////`)
        }
        // console.log(`========================== REDIS REQUEST END ======================`)
        // console.log(`************************ PROXY REQUEST START ***********************`)
        // const result = await request(DATA.URL)
        const result =`[{"default_currency_id":"CLP","id":"MLC","name":"Chile"},{"default_currency_id":"BRL","id":"MLB","name":"Brasil"},{"default_currency_id":"CRC","id":"MCR","name":"Costa Rica"},{"default_currency_id":"EUR","id":"MPT","name":"Portugal"},{"default_currency_id":"PEN","id":"MPE","name":"Perú"},{"default_currency_id":"PAB","id":"MPA","name":"Panamá"},{"default_currency_id":"USD","id":"MSV","name":"El Salvador"},{"default_currency_id":"VES","id":"MLV","name":"Venezuela"},{"default_currency_id":"BOB","id":"MBO","name":"Bolivia"},{"default_currency_id":"UYU","id":"MLU","name":"Uruguay"},{"default_currency_id":"CUP","id":"MCU","name":"Cuba"},{"default_currency_id":"USD","id":"MEC","name":"Ecuador"},{"default_currency_id":"ARS","id":"MLA","name":"Argentina"},{"default_currency_id":"NIO","id":"MNI","name":"Nicaragua"},{"default_currency_id":"GTQ","id":"MGT","name":"Guatemala"},{"default_currency_id":"COP","id":"MCO","name":"Colombia"},{"default_currency_id":"HNL","id":"MHN","name":"Honduras"},{"default_currency_id":"PYG","id":"MPY","name":"Paraguay"},{"default_currency_id":"MXN","id":"MLM","name":"Mexico"},{"default_currency_id":"DOP","id":"MRD","name":"Dominicana"}]`
        // console.log(`************************ PROXY REQUEST END ***********************`)
        // console.log(`################ ES REQUEST  #####################`)
        sendMetric(DATA.PATH, DATA.HOST, 200)
        // console.log(`################ ES REQUEST END #####################`)
        console.log(`////////////////////// END REQUEST /////////////////////////`)
        res.json(JSON.parse(result))
    } catch (e) {
        if (e.response && e.response.body) {
            // console.log(e.response.body.status)
            let body = JSON.parse(e.response.body)
            //  sendMetric(DATA.PATH, DATA.HOST, body.status ? body.status : 500)
            body.status ? res.status(body.status).jsonp(body) : res.status(500).jsonp(body)
            console.log(`////////////////////// END REQUEST /////////////////////////`)
        }
        res.status(500).jsonp(e)
        console.log(`////////////////////// END REQUEST /////////////////////////`)
    }
});
////////// CUSTOM POST'S ///////////////



app.post('/setMaxRate', async (req, res) => {
    // console.log(req.body)
    if (req.body && !req.body.key) {
        res.status(400).jsonp({
            "message": `missing 'key' param in request`,
            "error": "Bad Request",
            "status": 400,
            "cause": []
        })
    }
    if (req.body && !req.body.value) {
        res.status(400).jsonp({
            "message": `missing 'value' param in request`,
            "error": "Bad Request",
            "status": 400,
            "cause": []
        })
    }
    if (typeof req.body.value !== "number") {
        res.status(400).jsonp({
            "message": `'value' param must be a number`,
            "error": "Bad Request",
            "status": 400,
            "cause": []
        })
    }
    if (req.body.ttl && typeof req.body.ttl !== "number") {
        res.status(400).jsonp({
            "message": `'ttl' param must be a number`,
            "error": "Bad Request",
            "status": 400,
            "cause": []
        })
    }
    await setMaxRate(req.body.key, req.body.value, req.body.ttl)
    res.json({
        "message": 'rate updated'
    })
})



app.post('/getMetric', async (req, res) => {
    if (req.body && !req.body.id) {
        res.status(400).jsonp({
            "message": `missing 'id' param in request`,
            "error": "Bad Request",
            "status": 400,
            "cause": []
        })
    }
    if (typeof req.body.id !== "number") {
        res.status(400).jsonp({
            "message": `'id' param must be a number`,
            "error": "Bad Request",
            "status": 400,
            "cause": []
        })
    }
    var result = await getMetric(req.body.id)
    res.json(result)
});



app.listen(3000, function () {
    console.log('listening on port 3000!');
});