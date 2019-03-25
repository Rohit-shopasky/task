var express     = require('express');
var app         = express();
var path        = require('path');

var bodyParser  = require('body-parser'); // Parse json present in http request
var ejs         = require('ejs');

app.use(bodyParser.json({limit: '50mb'}));

app.use(bodyParser.urlencoded({
  limit: '100mb',
  extended: true
})); // get/parses the information from http body
// app.use(bodyParser.json());

var port = process.env.PORT || 3000; // set our port



require('./routes')(app);



//port to listen
app.listen(port, function () {
  console.log('Example app listening on port '+port+'!');
});
