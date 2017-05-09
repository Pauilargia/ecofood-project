/* jshint esversion:6 */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
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
    cookie: { maxAge: 60000 },
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


  // passport.serializeUser((user, cb) => {
  //   cb(null, user.id);
  // });
  //
  // passport.deserializeUser((id, cb) => {
  //   User.findById(id, (err, user) => {
  //     if (err) {
  //       return cb(err);
  //     }
  //     cb(null, user);
  //   });
  // });
  //
  // // Signing Up
  // passport.use('local-signup', new LocalStrategy({
  //   passReqToCallback: true
  //   },
  //   (req, email, password, next) => {
  //     // To avoid race conditions
  //     process.nextTick(() => {
  //       User.findOne({
  //         'email': email
  //       }, (err, user) => {
  //         if (err) { return next(err); }
  //
  //         if (user) {
  //           return next(null, false);
  //         } else {
  //
  //           const password = req.body.password;
  //           const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  //           const newUser = new User({
  //             username: req.body.username,
  //             name: req.body.name,
  //             email: req.body.email,
  //             location: req.body.location,
  //             password: hashPass
  //           });
  //
  //           newUser.save((err) => {
  //             if (err) {
  //               next(err);
  //             }
  //             return next(null, newUser);
  //           });
  //         }
  //       });
  //     });
  //   }));

  // passport.use('local-login', new LocalStrategy((email, password, next) => {
  //   User.findOne({ email }, (err, user) => {
  //     if (err) {
  //       return next(err);
  //     }
  //     if (!user) {
  //       return next(null, false, { message: "Incorrect email" });
  //     }
  //     if (!bcrypt.compareSync(password, user.password)) {
  //       return next(null, false, { message: "Incorrect password" });
  //     }
  //     return next(null, user);
  //   });
  // }));

  app.use(passport.initialize());
  app.use(passport.session());
};
