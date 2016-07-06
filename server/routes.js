var express = require('express');
var router = express.Router();

//the controllers that will handle the routes
var home = require('../controllers/home');
var image = require('../controllers/image');

module.exports = function(app) {
	//the second parameter for a route is a callback function
	router.get('/', home.index);
	router.get('/images/:image_id', image.index);
	router.post('/images', image.create);
	router.post('/images/:image_id/like', image.like);
	router.post('/images/:image_id/comment', image.comment);
	//a router behaves like a middleware, so it can be passed to
	//app.use()
	app.use(router);

	return app;
};