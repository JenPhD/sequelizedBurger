//Dependencies
// =================================
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var session = require('express-session');

// Express settings
// ==========================

// instantiate our app
var app = express();
//Sequelize migrations
var User = require('./models')['User'];
var Sequelburger = require('./models')['Sequelburger'];
User.sync();
Sequelburger.sync();

//allow sessions and use cookie parser
var cookieParser = require('cookie-parser');
app.use(session({ secret: 'app', cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true}));
app.use(cookieParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//set up handlebars
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

//Configure public web folder
app.use(express.static(path.join(__dirname, 'public')));

//Configure body-parser middleware
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Set up console logger
var logger = require('morgan');
app.use(logger('dev'));

//Configure app routes
//override with POST having ?_method=DELETE
var methodOverride = require('method-override'); //for deletes in express
app.use(methodOverride('_method'));

// Our model controllers
var application_controller = require('./controllers/application_controller');
var burgers_controller = require('./controllers/burgers_controller.js');
var users_controller = require('./controllers/users_controller');
app.use('/', application_controller);
app.use('/burgers', burgers_controller);
app.use('/users', users_controller);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler -- development error handler will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

//Error handler -- production handler not leaking stacktrace to user
app.use(function(err, req, res) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

// our module gets exported as app.
module.exports = app;

//listener in bin/www
//added Procfile

