const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const ClassSchema = new Schema({
    name : {
        type:String,
        required:[true,'Name field is required']
    },
    branch :{
        type:String
    },
    rollno:{
        type:Number
    }
});

const Class = mongoose.model('Class',ClassSchema);

module.exports = Class;