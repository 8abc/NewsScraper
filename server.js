// require dependencies
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

// scraping tools
const cheerio = require('cheerio');
const axios = require('axios');

console.log('\n------------------' + 
    '\nGrabbing every thread name and link' +
    '\nfrom hypebae.com: ' + 
    '\n------------------');

axios.get('https://hypebae.com/').then(function(response){
    let $ = cheerio.load(response.data);
    let results = [];
        $('a.post-link').each(function(i,element) {
        // saves the text of the title 
        let title = $(element).text().trim();
        let link = $(element).attr('href');
        // let imageLink = $(element).find('a').find('img').attr('data-hb-lazy-load').split(",")[0];
        // make an object for the data we scraped and push it to the results array
        results.push({
            title:title,
            link:link
            // link:imageLink
        });

    });
    console.log(results);
});
// -----------------
// require all models
// const db = require('./models');
const PORT = process.env.PORT || 3002;

// initializes express
const app = express();
// handlebars
// const exphbs = require('express-handlebars');
// app.engine('handlebars',exphbs({defaultLayout: 'main'}));
// app.set('view engine', 'handlebars');

// use morgan logger for logging request
// app.use(logger('dev'));
// parse request body as json
// app.use(express.urlencoded({extended: true}));
// app.use(express.json());
// makes public a static folder
// app.use(express.static('public'));

// database configuration
// const databaseUrl = 'scraper';
// const collections = ['scraperData'];
// hook mongojs configuration to db variable
// const db = mongojs(databaseUrl, collections);
// db.on('error', (error)=>{
//     console.log('Database errd: ', error);
// });
// conncet to the mongo db
// mongoose.connect('mongodb://localhost/scraperdb', {useNewUrlParser: true});


// console.log('\n------------------' + 
//     '\nGraddbing every thread name and link' +
//     '\nfrom highsnobiety: ' + 
//     '\n------------------');

// Routes
// app.get('/', (req,res) => {
//     res.render('')
// })
// A GET route for scraping 
// app.get('/scrape',(req,res)=>{
//     // makes a require via axios for highsnobiety
//     axios.get('https://www.highsnobiety.com/').then(function(response){
//         // loads and saves html into cheerio
//         const $ = cheerio.load(response.data);
//         // saves the data that we'll scrape
//         let results = [];

//     });
// });

// starts the server
app.listen(PORT, () => {
    console.log(`App running on port: ${PORT}`);
});
