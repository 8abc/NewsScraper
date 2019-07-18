// require dependencies
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

// scraping tools
const cheerio = require('cheerio');
const axios = require('axios');

// require all models
const db = require('./models');
const PORT = 3002;

// initializes express
const app = express();

// use morgan logger for logging request
app.use(logger('dev'));
// parse request body as json
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// makes public a static folder
app.use(express.static('public'));

// conncet to the mongo db
// mongoose.connect('mongodb://localhost/scraperdb', {})

console.log('\n------------------' + 
    '\nGraddbing every thread name and link' +
    '\nfrom highsnobiety: ' + 
    '\n------------------');

// Routes
// A GET route for scraping 
app.get('/scrape',(req,res)=>{
    // makes a require via axios for highsnobiety
    axios.get('https://www.highsnobiety.com/').then(function(response){
        // loads and saves html into cheerio
        const $ = cheerio.load(response.data);
        // saves the data that we'll scrape
        let results = [];

    });
});

// starts the server
app.listen(PORT, () => {
    console.log(`App running on port: ${PORT}`);
});