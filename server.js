// require dependencies
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require("body-parser");

// connection to models
const Note = require("./models/Notes");
const Article =require("./models/Article");

// scraping tools
const cheerio = require('cheerio');
const axios = require('axios');

// const db = require('./models');
const PORT = process.env.PORT || 3002;
// initializes express
const app = express();
// sets up express router
const router = express.Router();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + "/public"));
app.use(express.static("views/images"));

// Parse application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// sets up handlebars 
const exphbs = require("express-handlebars"); 
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// use bodyParser in our app
app.use(bodyParser.urlencoded({
  extended: false
}));

// have every request go through our router
app.use(router);

// If deployed, use deployed database otherwise use local scraper database
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/scraper";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
// connects to mongoose database
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connected to Mongoose!");
});

// sets up morgan 
app.use(logger("dev"));

// ROUTES
// get route -> index
app.get("/", (req, res)=>{
  res.render("index");
});
 
console.log('\n------------------' + 
    '\nGrabbing every thread name and link' +
    '\nfrom hypebae.com: ' + 
    '\n------------------');
app.get("/scrape", (req,res)=>{
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
          // Create a new Article using the results object built from scraping
          db.Article.create(result)
          .then(function(dbArticle){
            // view the added results in the console
            console.log(dbArticle);
          })
          .catch(function(err){
            // if an error occurred, log it
            console.log(err);
          });
      });
      // console.log(results);
      // Send a message to the client
      res.send("Scrape Complete");
  });
});
// grab articles we scraped from the mongoDB
// app.get("/articles", (req,res)=>{
//   // grabs every doc in the Articles array
//   Article.find(), function(err,doc){
//     // log any errors
//     if (err) {
//       console.log(err);
//     }
//     // or send the doc to the browser as a json object
//     else {
//       res.json(doc);
//     }
//   }
// }); 

// saved articles

// delete article from database

// Add note to an article

// get back all notes for a specific article

// delete note from article

// clear all articles from databse



// starts the server
app.listen(PORT, () => {
    console.log(`App running on port: ${PORT}`);
});

