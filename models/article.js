const mongoose = require('mongoose');

// saves a reference to the schema constructor
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    // note is an object that stores a note ID
    // the ref property links the objectID to the note model 
    // allows us to populate the Article with an associated Note
    note: [{
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }]
});

// creates model from the schema above, using mongoose's model method
const Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;