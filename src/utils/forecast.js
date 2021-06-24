var request = require('request');

const forecast = (latitude, longitude, callback) => {
    //https://weatherstack.com/quickstart
    const url = 'http://api.weatherstack.com/current?access_key=c5a2910e084f8db6eb22001c7b2e8131&query=' + latitude + ',' + longitude + '&units=f';

    request({ url, json: true }, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined)
        } else if(body.error) {
            callback('Unable to find location', undefined)
        } else {
            // commenting below code as we have destructed "response" 
            // callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degress out. There is a ' + response.body.current.precip + '% chance of rain.')
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.precip + '% chance of rain. And the UV Index is ' + body.current.uv_index)
        }
    })
}

module.exports = forecast;