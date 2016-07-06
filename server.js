var express = require('express');
var mongoose = require('mongoose');

var config = require('./server/configure');
var routes = require('./server/routes');
var app = express();

//Asign value to one of the application settings
//app.set(name, value)
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
//setting more configurations
app = config(app);
app = routes(app);

mongoose.connect('mongodb://horacio:123456@ds021984.mlab.com:21984/imgploadr', function(err) {
  if(err) throw err;
  console.log('connected to mongo');
});

//app.listen() is identical to http.Server.listen()
//the app.listen() returns an http.Server object 
var server = app.listen(app.get('port'), function() {
	console.log('Server up: http://localhost:' + app.get('port'));
});
