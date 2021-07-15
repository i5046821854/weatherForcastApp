const request = require('request')

const geocode = (address, callback) =>{
    
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibWlrZWF3dSIsImEiOiJja3IwMTh0OXYwMnUwMnVyenFyd2Z6dG8xIn0.BN7IqPTMlZtYkyJ8_jJ07Q&limit=1"
    request({url, json:true}, (error,{body : Body}= {})=>{ //with es6 object shortcut & destructuring
        if(error)
        {
            callback("unable to connect", undefined)
        }
        else if(Body.features.length === 0)
        {
            callback("invalid input", undefined)
        }
        else{
            const lat = Body.features[0].center[1]
            const lng = Body.features[0].center[0]
            const location = Body.features[0].place_name
            callback(undefined, {lat, lng, location}) //with es6 object shortcut
        }
    })

}

module.exports = geocode