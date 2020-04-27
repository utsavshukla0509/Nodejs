var express = require('express'),
    app = express();




const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var Router = require('./crud');


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true})); 

app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/textfile');
mongoose.Promise = global.Promise;

app.use('/api',Router);


app.use(function(err,req,res,next){
    res.status(422).send({error:err.message}); 
 });

app.listen(8000, function () {
    console.log('Listening on port 8000');
});