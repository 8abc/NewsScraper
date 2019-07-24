// require dependencies
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');

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

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));
app.use(express.static("views/images"));

// Parse application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// sets up handlebars 
const exphbs = require("express-handlebars"); 
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// connects to mongoose database
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/scraper";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

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

      });
      console.log(results);
  });
});

app.get("/articles", (req,res)=>{
  Article.find().sort({_id:-1}).exec(function(err,doc){
    if(err) {
      console.log(err);
    } else {
      let articles = {article: doc};
      res.render("index",articles)
    }
  });
});
// starts the server
app.listen(PORT, () => {
    console.log(`App running on port: ${PORT}`);
});

