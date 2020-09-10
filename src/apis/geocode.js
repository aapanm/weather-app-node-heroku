const axios = require('axios'); 

const geolocBASEURL = "https://api.mapbox.com/geocoding/v5/mapbox.places";
const access_token = "pk.eyJ1IjoiYXBvbm11IiwiYSI6ImNrZWN3dGp5ODBidzQycXM0anFoNTJtZnEifQ.mw-utHfpz5UfjHn6BP9Lnw"

const geoCode = (address, callback) =>{
    console.log(address);
    axios.get(geolocBASEURL+'/'+`${encodeURIComponent(address)}`+'.json?',{
        params:{
            access_token
        }
    }).then((response)=>{
        if(response.data.features.length){
            const data = {
                lat:response.data.features[0].center[1],
                lon:response.data.features[0].center[0],
                location:response.data.features[0].place_name
            }
            callback(data, true);
        }else{
            callback('please search again!', false)
        }
    }).catch(function (error) {
        if(error.response){
            callback('unable to fetch data at given location!', false);
        }else{
            callback('Please check your internet!', false);
        }
      })
}

module.exports = geoCode;