const express = require('express');
const mongoose = require('mongoose');
const Router = require('../node/crud');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true})); 

app.use('/api',Router);

mongoose.connect('mongodb://localhost:27017/mydb');
mongoose.Promise = global.Promise;


app.use(function(err,req,res,next){
   res.status(422).send({error:err.message}); 
});

var port = process.env.PORT || 3000;
app.listen(port, () => console.log(`app listening on port : %d`,port));
