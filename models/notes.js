const mongoose = require('mongoose');

// saves a reference to the schema constructor
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    name: {
        type: String,
    },
    body: {
        type: String,
        required: true
    },
    // note is an object that stores a note ID
    // the ref property links the objectID to the note model 
    // allows us to populate the Article with an associated Note
    comment: [{
        type: String,
        required: true
    }]
});

// creates model from the schema above, using mongoose's model method
const Note = mongoose.model('Note', NoteSchema);
module.exports = Note;