const axios = require('axios'); 

const baseUrl = 'http://api.openweathermap.org/data/2.5/onecall?';
const appid = '2d1d451304f3c0baf4dfaaafd180eb42';

const getWeatherForecast = (lat, lon, callback) =>{
    axios.get(baseUrl, {
        params:{
            lat,
            lon,
            appid,
            units:'metric',
            lang:"en"
        }
        
    }).then((response)=>{
        callback((response.data.daily[0].weather[0].description)+". it's currently "+response.data.current.temp+" degrees out there and humidity is "+response.data.current.humidity+"!", true);
    }).catch(function ({response}) {
        if(response){
            callback('unable to fetch data at given location!', false);
        }else{
            callback('Please check your internet!', false);
        };
      })
}

module.exports = getWeatherForecast;