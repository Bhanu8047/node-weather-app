const path = require('path')
const express = require('express')
const hbs = require('hbs')

// API's
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

// Define paths for express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Handle bars 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// To serve the static pages
app.use(express.static(publicPath))

app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Bhanu P'
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'About Page',
        name: 'Bhanu P'
    })
})

app.get('/help', (req,res)=>{
    res.render('help', {
        title: 'Help Page',
        message: 'Hey i am here to help you!',
        name: 'Bhanu Pratap'
    })
})

// app.get('', (req, res) => {
//     res.send('Hello there this is express running!')
// })

// app.get('/help', (req,res) => {
//     res.send("<h1 >Hey I'm here to help you!<h1>")
// })

// app.get('/about', (req,res) => {
//     res.send('Hey there i am Rusty C, Welcome to my new website!')
// })



// Getting the weather
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'No address?'
        })
    }
    geocode(req.query.address, (err,{ latitude, longitude, location } = {})=>{

        if(err) {
            return res.send({ err })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})


app.get('/products', (req, res)=>{

    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*', (req,res) => {
    res.render('404', {
        error_message: 'Help article not found!',
        name: 'Bhanu Pratap',
        title: '404 Page'
    })
})

// 404 Page
app.get('*', (req,res) => {
    res.render('404', {
        error_message: 'Page Not Found!',
        name: 'Bhanu Pratap',
        title: '404 Page'
    })
})


app.listen(8000, ()=>{
    console.log('Server is up on the port 8000.')
})

