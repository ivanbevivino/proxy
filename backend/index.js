const {
    config
} = require('./config');
var {
    isRateExceded,
    setMaxRate
} = require('./helpers/rate')


const express = require('express')
const request = require('request-promise-native')
const app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({
    extended: true
})) // for parsing application/x-www-form-urlencoded


app.get('*', async (req, res) => {
    console.log(`////////////////////// START REQUEST /////////////////////////`)
    const DATA = {
        URL: req.path ? config.url + req.path : config.url,
        PATH: req.path,
        HOST: req.headers.host
    }


    try {
        if (await isRateExceded(DATA)) {
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

app.post('/setMaxRate', async (req, res) => {
    console.log(req.body)
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
    await setMaxRate(req.body.key, req.body.value,req.body.ttl)

    res.json({"message":'rate updated'})
})


app.listen(3000, function () {
    console.log('listening on port 3000!');
});