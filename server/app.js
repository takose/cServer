const express = require('express');
const https = require('https');
const fs = require('fs');

const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const index = require('./routes/index');
const taste = require('./routes/taste');

const app = express();

const io = require('socket.io')(https);

const ConnectionManager = require('./lib/ConnectionManager');

const connectionManager = new ConnectionManager();

dotenv.config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const headerOptions = {
  setHeaders: function (res, path, stat) {
    res.set('Access-Control-Allow-Origin', '*')
  }
}
// app.use(express.static(path.join(__dirname, 'public'), headerOptions));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', index);
app.use('/taste', taste);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, _) => { // eslint-disable-line no-unused-vars
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

io.on('connection', (socket) => {
  connectionManager.addConnection(socket);
});

const options = {
	key: fs.readFileSync('/etc/apache2/ssl/server.key'),
	cert: fs.readFileSync('/etc/apache2/ssl/server.crt'),
	passphrase: 'raspberry',
	requestCert: false,
	rejectUnauthorized: false
};

const server = https.createServer(options, app);

io.listen(server);
server.listen(3000);
