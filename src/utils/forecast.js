const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/df1823884e1a26955432c3d7dbf8d539/'+ lat + ','+ long

    request( {url, json:true}, (error, { body })=>{
        if(error) {
            callback('Unable to connect to weather services!', undefined)
        } else if(body.error) {
            callback('Unable to find the location ! Try again.', undefined)
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out here. There is a ${body.currently.precipProbability*100}% chance of rain.`)
        }
    })
}

module.exports = forecast