/*jshint esversion: 6*/
//sergio y Paula

const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const layouts      = require('express-ejs-layouts');
const mongoose     = require('mongoose');
const bcrypt       = require('bcryptjs');
const passport     = require('passport');
const session      = require('express-session');
const MongoStore   = require('connect-mongo')(session);

const index = require('./routes/index');
const authRoutes = require('./routes/authentication.js');
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/user');

// Connect with database
mongoose.connect('mongodb://localhost/ecofood');

// Express instance
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main-layout');
app.use(layouts);

// default value for title local
app.locals.title = 'EcoFood';

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules/')));

// Configure passport authentication
require('./config/authentication.js')(app);
app.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
});

//Routes
app.use('/', index);
app.use('/', authRoutes);
app.use('/', productRoutes);
app.use('/', userRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
