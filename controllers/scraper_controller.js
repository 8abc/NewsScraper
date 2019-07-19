// scraping tools
// const cheerio = require('cheerio');
// const axios = require('axios');
// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/scraper', {useNewUrlParser: true});

// save the URL of our database and name of our collection
// const databaseURL ='scraper';
// const collections = ['articles'];
// use mongojs to hook the database to db variable
// const db = mongojs(databaseURL, collections);
// db.on('error',(error)=>{
//     console.log('Database Error: ', error);
// });
// // Routes
// app.get('/',(req,res)=>{
//     res.render('index');
// });
// app.get('all',(req,res)=>{
//     db.articles.find({},(error,found)=>{
//         if(error) {
//             return error;
//         }
//         else {
//             res.json(found);
//         }
//     });
// });
// const Note = require('../models/Notes');
// const Article = require('../models/Article');

// default route
//  app.get('/',(req,res)=>{ res.render('index')});

//  scrape articles route
// console.log('\n------------------' + 
//     '\nGrabbing every thread name and link' +
//     '\nfrom hypebae.com: ' + 
//     '\n------------------');
// // scrape articles route
// app.get('/api/search',(req,res)=>{
//     axios.get('https://hypebae.com/').then(function(response){
//         let $ = cheerio.load(response.data);
//         let results = [];
//             $('a.post-link').each(function(i,element) {
//             // saves the text of the title 
//             let title = $(element).text().trim();
//             let link = $(element).attr('href');
//             // let imageLink = $(element).find('a').find('img').attr('data-hb-lazy-load').split(",")[0];
//             // make an object for the data we scraped and push it to the results array
//             results.push({
//                 title:title,
//                 link:link
//                 // link:imageLink
//             });

//         });
//         console.log(results);
//     });
// });

