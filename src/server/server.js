const path = require('path')
const webpack = require('webpack')
const express = require('express')
const fetch = require('node-fetch')
require('dotenv').config()
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const cors = require('cors')
app.use(cors());
app.use(express.static('dist'))


app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

const port = process.env.PORT || 3000
app.listen(port, function () {
    console.log('Example app listening on port 3000!')
    console.log('http://localhost:3000')
});

//Keys
// const geoKey = process.env.GEO_KEY
const geoKey = 'cc37e73082c54ce2ac8b59591d1b6006'
// const darkKey = process.env.DARKSKY_KEY
const darkKey = 'a66b988c2d66045ea73975831e86648f'
// const pixKey = process.env.PIX_KEY
const pixKey = '15324148-2985f37b999ac9cae0550d3a1'


app.post('/geoApi', async(req, res) => {
    const data = req.body
    const place = data.input 

    const geoApi = await fetch(`http://api.geonames.org/?username=chanderbhanu096=0.8&maxRows=10&name=${chanderbhanu096}`)
    const geoData = await geoApi.json()
    res.send(geoData)
})

app.post('/darkApi', async(req, res) => {
    const data = req.body
    const lat = data.lat
    const long = data.long
    const time = data.time

    const darkSky = await fetch(`http://api.weatherbit.io/v2.0/forecast/daily?units=M&key=cc37e73082c54ce2ac8b59591d1b6006&days=${time}&lat=${lat}&lon=${long}`)
    const darkData = await darkSky.json()
    res.send(darkData)
})

app.post('/pixApi', async(req, res) => {
    const data = req.body 
    const place = data.input

    const pixApi = await fetch(`https://pixabay.com/api/?key=${pixKey}&q=${place}&image_type=photo`)
    const pixData = await pixApi.json()
    res.send(pixData)
})