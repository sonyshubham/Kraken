
/**
 *
 */

var chalk         = require('chalk')
  , jsome         = require('jsome')
  , express       = require('express')
  , path          = require('path')
  , Swag          = require('swag')
  , cors          = require('cors')
  , logger        = require('morgan')
  , log4js        = require('log4js') 
  , mongoose      = require('mongoose')
  , auth          = require('http-auth')
  , bodyParser    = require('body-parser')
  , hbs           = require('express-hbs')
  , cookieParser  = require('cookie-parser')
  , favicon       = require('serve-favicon')

var app = express();

// var basic = auth.basic({
//     realm: "Private Access",
//     file: __dirname + "/data/users.htpasswd" // gevorg:gpass, Sarah:testpass ...
// })

app.use(cors());


// app.use(auth.connect(basic)); 
// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.set('view engine', 'hbs');

// configure the view engine 
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs.express4({  
    defaultLayout: __dirname + '/views/layouts/__layout.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}))

require('./middlewares/loadHandlebarsHelpers')();

app.use(logger('dev'));
var LOG_LEVEL = process.env.LOG_LEVEL;
var logPath = './app.log';

LOG_LEVEL = (typeof LOG_LEVEL == "undefined" ) ? "DEBUG": LOG_LEVEL;

log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file(logPath), 'shelfjoy');

var log4jsLogger = log4js.getLogger('kraken');

console.log('Started logging to '+logPath+' with level: '+ LOG_LEVEL);

log4jsLogger.setLevel(LOG_LEVEL);

app.use(bodyParser.json({limit: '20mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '20mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


if (app.get('env') === 'development') {

    var config = require('./config/development');
    app.config = config;

} else if (app.get('env') === 'staging') {

    var config = require('./config/staging');
    app.config = config;

} else {

    var config = require('./config')()
    app.config = config;
}

/**
 * Load Custom middlewares
 */
app.use(require('./middlewares/locals'))
mongoose.Promise = require('bluebird')
app.mongoose = {}
console.log("the options are ");
console.log(config.mongodb.options);
mongoose.connect(config.mongodb.kraken.uri, config.mongodb.options);
// app.mongoose.krakenDb = krakenDb;
// require('./middlewares/redis')(app)
require('./middlewares/models')(app)
require('./middlewares/routes')(app)
require('./middlewares/startPing')(app)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    console.log(chalk.green.underline('in 404 and others'), ' for ' , req.url)
    var err = new Error('Not Found')
    err.status = 404;
    next(err)
})

// NOT production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    next(err)
});
module.exports = app;
