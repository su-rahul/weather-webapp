const request = require('request')

const fToC = (fahrenheit) =>
{
  const C = (fahrenheit - 32) * 5 / 9;
  return C.toFixed(2)
} 

const forecast= (latitude, longitude,callback) => {

    const url = 'https://api.darksky.net/forecast/7de64b2b3eefdd7043982ca1e88d63dc/'+latitude+','+longitude;

    //Shorthanded and destructured

    request({url, json:true}, (error, {body}) =>{
        if (error){
            callback("Unable to connect to weather service",undefined)
        }
        else if (body.error){
            callback("Unable to find the location",undefined)
        }
        else
        {
            callback(undefined,body.daily.data[0].summary + ' It is currently '+fToC(body.currently.temperature)+'°C out. The high temperature is '+fToC(body.daily.data[0].temperatureHigh)+ '°C and the low temperature is '+fToC(body.daily.data[0].temperatureLow)+'°C. There is a '+body.currently.precipProbability+'% chance of rain'
        )
    }
    })
}

module.exports = forecast;