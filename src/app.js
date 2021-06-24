// As "path" is a Node.js core module we don't need to install directly use require
// https://expressjs.com/en/4x/api.html#app
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath) 

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Yaqoob'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About',
        name: 'Yaqoob'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        helpText: 'This is a help content',
        name: 'Yaqoob'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            errorMessage: 'You must provide a address term'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

// Below Error shows up in the terminal if we are sending response (res.send()) more than once and also we see that both res.send() runs
// Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client

// Fix: Add "return" to res.send(). Hence it will not execute twice

app.get('/products', (req, res) => {
    // This console prints query string which is added to the URL
    console.log(req.query)
    // Checks if "search" query string in added to the URL
    if(!req.query.search) {
        return res.send({
            errorMessage: 'You must provide a search term'
        })
    }
    // This console prints query string search term value
    console.log(req.query.search)
    res.send({
        products: []
    })
})

// Webpage URL without search term: http://localhost:3000/products
// Output: 
// {
//     "errorMessage": "You must provide a search term"
// }

// Webpage URL with search term: http://localhost:3000/products?search=games
// Output: 
// {
//     "products": []
// }


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Yaqoob',
        errorMessage: 'Help article not found.'
    })
})

// * is match everything
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Yaqoob',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on 3000')
})