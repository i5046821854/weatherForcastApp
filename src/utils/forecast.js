const request = require('request')

const forcast = (lat, lng, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=624edfd30668f5b49304e551e128b10d&query=' + encodeURIComponent(lng) + ',' + encodeURIComponent(lat) + '&units=f'
    request({url, json:true}, (error, {body: Body} = {}) => { //with es6 object shortcut & destructuring
        if(error)
        {
            callback("unable to connect", undefined)
        }
        else if(Body.error){
            callback("invalid input", undefined)
        }
        else{
            const body = Body.current
            callback(undefined, body.weather_descriptions[0] + ". It is currently " + body.temperature+ " degrees out. It feels like " + body.feelslike + " degrees. the humidity is " + body.humidity)
        }
    })

}

module.exports = forcast