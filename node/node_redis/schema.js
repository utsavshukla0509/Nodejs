const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const Book = new Schema({
    title : {
        type:String,
        // required:[true,'Name field is required']
    },
    author :{
        type:String
    },
    text:{
        type:String
    }
});

const book = mongoose.model('book',Book);

module.exports = book;