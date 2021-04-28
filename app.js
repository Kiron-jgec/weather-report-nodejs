
const path = require("path")
const request = require("request");
const express = require("express")
const hbs = require("hbs")
// console.log(path.join(__dirname,'./public'))
const app = express()
require("dotenv").config();
// define paths for express config
const publicDirectory = path.join(__dirname, './public')

const viewsPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')
// setup heldelbars engine and views locations

app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
// setup static directory
app.use(express.static(publicDirectory))

//routers 

  //home
app.get("", (req, res) => {
    res.render('index',
        {
            title: "Wather App",
            
        })
})

// weather app 

app.get("/weather", (req, res, next) => {

    if (!req.query.location) {
        return res.send({
            error: "You must provide a location !"
        })
    }

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${req.query.location}&appid=${process.env.WEATHER_API_KEY}`
    request({ url: url }, (error, response) => {

        const data = JSON.parse(response.body);
        res.send(
            {
                title: "Wather",
                adress: req.query.address,
                wather: data
            })
    })
})





app.get("*", (req, res) => {
    res.render('notfound',
        {
            title: "Page Not found",

        })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("Server is running in port "+ port)
})