var express = require('express')
  , controllers  = require('./controllers')
  , http    = require('http')
  , path    = require('path')
  , db      = require('./models');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

db.sequelize.sync().then(function() {
  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
});

//Trying to catch npm bug with a cat
function cat_npm_debug_log() {
  if [ -f $BUILD_DIR/npm-debug.log ]; then
    cat $BUILD_DIR/npm-debug.log
  fi
}

trap cat_npm_debug_log EXIT;

// our module gets exported as app.
module.exports = app;