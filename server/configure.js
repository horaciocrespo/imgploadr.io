var path = require('path');
var exphbs = require('express-handlebars');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');
var moment = require('moment');

var multer = require('multer');



module.exports = function(app){
	//app.use() mounts the middleware function(s) at the path.
	//if path is not specified it defaults to '/'
	app.use(morgan('dev'));
	
	/*app.use(bodyParser({
			uploadDir:path.join(__dirname, 'public/upload/temp')
	}));*/
	app.use(bodyParser.urlencoded({'extended':true}));
	app.use(bodyParser.json());
	
	//??
	var upload = multer({ dest: path.join(__dirname,'public/upload/temp')});
	app.use(upload.single('file'));

	app.use(methodOverride());
	app.use(cookieParser('some-secret-value-here'));
	//??
	app.use('/public/', express.static(path.join(__dirname,'../public')));
	
	if('development' === app.get('env')){
		app.use(errorHandler());
	}

	//expbhs.create(options) creates a expressHandlebars instance and returns function
	//app.engine(ext,callback)--> ext is the name of the file extension
	hbs = exphbs.create({
		defaultLayout: 'main',
		layoutsDir: app.get('views') + '/layouts',
		partialsDir: app.get('views') + '/partials',
		helpers: {
			timeago: function(timestamp) {
				return moment(timestamp).startOf('minute').fromNow();
			}
		}
	});

	app.engine('handlebars', hbs.engine);
	app.set('view engine', 'handlebars');

	return app;
}