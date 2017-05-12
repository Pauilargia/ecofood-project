/* jshint esversion:6 */

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/user.js');

module.exports = app => {
  app.use(session({
    secret: 'buy and sell ecological food',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 6000000 },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 // 1 day
    })
  }));

  app.use((req, res, next) => {
    if (req.session.currentUser) {
      res.locals.currentUserInfo = req.session.currentUser;
      res.locals.isUserLoggedIn = true;
    } else {
      res.locals.isUserLoggedIn = false;
    }

    next();
  });
};
