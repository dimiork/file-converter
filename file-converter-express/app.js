var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var csv2jsonRoute = require('./routes/csv2json');
var json2csvRoute = require('./routes/json2csv');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/json2csv', json2csvRoute);
app.use('/csv2json', csv2jsonRoute);

module.exports = app;
