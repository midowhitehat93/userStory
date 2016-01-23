/**
 * Created by youxel on 1/23/2016.
 */
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');
var mongoose = require('mongoose'); // call db
var app = express(); // get an object of express

var http = require('http').Server(app);
var io = require('socket.io')(http);

mongoose.connect(config.database, function(err){
    if(err){
        console.log(err);
    }else{
        console.log('connected to the database');
    }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(__dirname + '/public')); // render all css and js before any routes

var api = require('./app/routes/api')(app, express, io);
app.use('/api', api);

app.get('*', function(req, res){ // any route or url goto this file
    res.sendfile(__dirname + '/public/app/views/index.html');
});

http.listen(config.port, function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Listening on port 3000");
    }
});