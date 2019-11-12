const {
    config
} = require('./config');
var {
    isRateExceded,
    setMaxRate,
    getMaxRate,
    deleteMaxRate
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
        return res.json(result)
    } catch (e) {
        return res.status(500).jsonp(e)
    }
});
////////// REVERSE PROXY  ///////////////



app.get('*', async (req, res) => {
    const DATA = {
        URL: req.path ? config.url + req.path : config.url,
        PATH: req.path,
        HOST: req.headers.host
    }
    try {
        if (await isRateExceded(DATA)) {
            sendMetric(DATA.PATH, DATA.HOST, 403)
            return res.status(403).jsonp({
                "message": "Rate Exceded",
                "error": "Forbiden",
                "status": 403,
                "cause": []
            })
        }
        const result = await request(DATA.URL)  
        // const result =`[{"default_currency_id":"CLP","id":"MLC","name":"Chile"},{"default_currency_id":"BRL","id":"MLB","name":"Brasil"},{"default_currency_id":"CRC","id":"MCR","name":"Costa Rica"},{"default_currency_id":"EUR","id":"MPT","name":"Portugal"},{"default_currency_id":"PEN","id":"MPE","name":"Perú"},{"default_currency_id":"PAB","id":"MPA","name":"Panamá"},{"default_currency_id":"USD","id":"MSV","name":"El Salvador"},{"default_currency_id":"VES","id":"MLV","name":"Venezuela"},{"default_currency_id":"BOB","id":"MBO","name":"Bolivia"},{"default_currency_id":"UYU","id":"MLU","name":"Uruguay"},{"default_currency_id":"CUP","id":"MCU","name":"Cuba"},{"default_currency_id":"USD","id":"MEC","name":"Ecuador"},{"default_currency_id":"ARS","id":"MLA","name":"Argentina"},{"default_currency_id":"NIO","id":"MNI","name":"Nicaragua"},{"default_currency_id":"GTQ","id":"MGT","name":"Guatemala"},{"default_currency_id":"COP","id":"MCO","name":"Colombia"},{"default_currency_id":"HNL","id":"MHN","name":"Honduras"},{"default_currency_id":"PYG","id":"MPY","name":"Paraguay"},{"default_currency_id":"MXN","id":"MLM","name":"Mexico"},{"default_currency_id":"DOP","id":"MRD","name":"Dominicana"}]`
        sendMetric(DATA.PATH, DATA.HOST, 200)
        return res.json(JSON.parse(result))
    } catch (e) {
        if (e.response && e.response.body) {
            let body = JSON.parse(e.response.body)
             sendMetric(DATA.PATH, DATA.HOST, e.statusCode ? e.statusCode : 500)
            e.statusCode ? res.status(e.statusCode).jsonp(body) : res.status(500).jsonp(body)
        }
        return res.status(500).jsonp(e)
    }
});
////////// CUSTOM POST'S ///////////////



app.post('/setMaxRate', async (req, res) => {
    // console.log(req.body)
    if (req.body && !req.body.key) {
        return res.status(400).jsonp({
            "message": `missing 'key' param in request`,
            "error": "Bad Request",
            "status": 400,
            "cause": []
        })
    }
    if (req.body && !req.body.value) {
        return res.status(400).jsonp({
            "message": `missing 'value' param in request`,
            "error": "Bad Request",
            "status": 400,
            "cause": []
        })
    }
    if (typeof req.body.value !== "number") {
        return res.status(400).jsonp({
            "message": `'value' param must be a number`,
            "error": "Bad Request",
            "status": 400,
            "cause": []
        })
    }
    if (req.body.ttl && typeof req.body.ttl !== "number") {
        return res.status(400).jsonp({
            "message": `'ttl' param must be a number`,
            "error": "Bad Request",
            "status": 400,
            "cause": []
        })
    }
    await setMaxRate(req.body.key, req.body.value, req.body.ttl)
    return res.json({
        "message": 'rate updated'
    })
})



app.post('/getMetric', async (req, res) => {
    if (req.body && !req.body.id) {
        return res.status(400).jsonp({
            "message": `missing 'id' param in request`,
            "error": "Bad Request",
            "status": 400,
            "cause": []
        })
    }
    if (typeof req.body.id !== "number") {
        return res.status(400).jsonp({
            "message": `'id' param must be a number`,
            "error": "Bad Request",
            "status": 400,
            "cause": []
        })
    }
    var result = await getMetric(req.body.id, req.body.from, req.body.to)
    return res.json(result)
});





app.post('/deleteMaxRate', async (req, res) => {
    console.log(req.body)
    if (req.body && !req.body.key) {
        return res.status(400).jsonp({
            "message": `missing 'key' param in request`,
            "error": "Bad Request",
            "status": 400,
            "cause": []
        })
    }

    await deleteMaxRate(req.body.key)
    return res.json({
        "message": 'rate updated'
    })
})


app.listen(3000, function () {
    console.log('listening on port 3000!');
});