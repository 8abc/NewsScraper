const express = require('express');
const router = express.Router();
const path = require('path');

const axios = require('axios');
const cheerio = require('cheerio');

const Note = require('../models/Notes');
const Article = require('../models/Article');

 router.get('/', function(req,res){
    res.redirect('/articles');
 });

 router.get('/scraper', (req,res)=>{
    // A GET route for scraping 
    app.get('/home',(req,res)=>{
        // makes a require via axios for highsnobiety
        axios.get('https://www.highsnobiety.com/').then(function(response){
            // loads and saves html into cheerio
            const $ = cheerio.load(response.data);
            // saves the data that we'll scrape
            let results = [];
            // With cheerio, find each article-tag with the class of tease
            // (i: iterator. element: the current element
            $('.teaser_title').each(function(i, element){
                // saves the text of the title 
                let title = $(this).text();
                let link = $(this).children().attr('href');
                // make an object for the data we scraped and push it to the results array
                results.push({
                    title:title,
                    link:link
                });
                console.log(results);
            });
        });
    });
 });