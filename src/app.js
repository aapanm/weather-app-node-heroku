const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./apis/geocode');
const forecast = require('./apis/forecast');


const app = express();

//define paths
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

//setup handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

//setup static directory 
app.use(express.static(publicDir));

const name = 'Aapan'

app.get('', (req,res)=>{
    res.render('index', {
        title:'Weather',
        name
    });
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title:'About Me',
        name
    });
})

app.get('/help', (req,res)=>{
    res.render('help',{
        title:'Message from Creator',
        msg:'Please don reveal sensitive information about you like credit card, banking and other financial documents!',
        name
    });
})


app.get('/weather', (req, res)=>{
    
    if(!req.query.address){
        return res.send({
            Error: "Must provide an address!"
        });
    }

    geocode(req.query.address, (geoResponse, code)=>{
        if(code){
            const {lat, lon, location} = geoResponse;
            forecastData = forecast(lat, lon, (response, code)=>{
                if(code){
                    res.send({
                        location: location,
                        forecast: response
                    });
                }else{
                    res.send({
                        Error: response
                    });
                }
            })
        }else{
            res.send({
                Error: geoResponse
            });
        }
    })
    
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: '404',
        name,
        errorMessage: '404 Error: Not found!'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000!');
})