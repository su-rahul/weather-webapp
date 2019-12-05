const path = require('path')
const express = require ('express')
const hbs = require('hbs')

const geocode = require ('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define path for express config
const directoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

const port = process.env.PORT || 3000;

//Setup static directory to serve
app.use(express.static(directoryPath))

//Setup handlebars and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res) => {
    res.render('index',({
        title : 'Weather App',
        name : 'Rahul'
    }))
})

app.get('/help', (req,res) => {
    res.render('help',({
        title : 'Help Page',
        helpText : 'For any kind of issue/help, please reach out to us at rahuliconite@gmail.com',
        name : 'Rahul'
    }))
})

app.get('/help/*', (req, res) =>{
    res.render('404',({
        title : 'Help Error Page',
        errorMessage : 'Help Article not found!',
        name : 'Rahul'
    }))
})

app.get('/about', (req,res) => {
    res.render('about', ({
        title : 'About Page',
        name : 'Rahul'
    }))
})

app.get('/weather',(req,res) =>{
    if(!req.query.address){
        return res.send({
             error :'Please provide entry for location!'
        })
    }
    geocode(req.query.address,(error,{latitude, longitude, place} = {}) => {
        if(error){
            return res.send(error)
        }
        forecast(latitude, longitude, (error,forecastData) => {
            if (error){
                return res.send(error)
            }
        res.send({
            forecast: forecastData,
            place,
            address: req.query.address
            })
        })
    })
})


app.get('*', (req,res) => {
    res.render('404', ({
        title : 'Error Page',
        errorMessage : 'Page Not Found!',
        name : 'Rahul'
    }))
})

app.listen(port , () =>{
    console.log('Server started at port '+port)
})