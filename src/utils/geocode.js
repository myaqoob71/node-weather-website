const request = require("request");

const geocode = (address, callback) => {
    //When user passes any special characters like ? the URL breaks. Hence using encodeURICompnent() which converts to %3F for ?
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibXlhcW9vYiIsImEiOiJja3Bub21tankwM3QzMm9rY3FieW80cWgxIn0.ZPTeTgK7A2K40sgkbcmKoA&limit=1'

    request({ url, json: true }, (error, {body}) => {
        if(error) {
            callback('Unable to connect to location service!', undefined);
        } else if(body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;