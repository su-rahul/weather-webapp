const request = require('request')

const forecast= (latitude, longitude,callback) => {

    const url = 'https://api.darksky.net/forecast/7de64b2b3eefdd7043982ca1e88d63dc/'+latitude+','+longitude;

    //Shorthanded and destructured
    
//(error, response) => Either error or response from the request

    request({url, json:true}, (error, {body}) =>{
        if (error){
            callback("Unable to connect to weather service",undefined)
        }
        else if (body.error){
            callback("Unable to find the location",undefined)
        }
        else
        {
            callback(undefined,body.daily.data[0].summary + ' It is currently '+body.currently.temperature+' degrees out. The high temperature is '+body.daily.data[0].temperatureHigh+ ' and the low temperature is '+body.daily.data[0].temperatureLow+'. There is a '+body.currently.precipProbability+'% chance of rain'
        )
    }
    })
}

module.exports = forecast;