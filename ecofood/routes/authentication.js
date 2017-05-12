/*jshint esversion: 6*/

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const bcryptSalt = 10;

//User Sign Up
router.get('/signup', (req, res, next) => {
  res.render('authentication/signup', {
    errorMessage: ''
  });
});

router.post('/signup', (req, res, next) => {
  const nameInput = req.body.name;
  const usernameInput = req.body.username;
  const emailInput = req.body.email;
  const passwordInput = req.body.password;
  const locationInput = req.body.location;

  if (emailInput === '' || passwordInput === '') {
    res.render('authentication/signup', {
      errorMessage: 'Enter both email and password to sign up.'
    });
    return;
  }

  User.findOne({ email: emailInput }, '_id', (err, existingUser) => {
    if (err) {
      next(err);
      return;
    }

    if (existingUser !== null) {
      res.render('authentication/signup', {
        errorMessage: `The email ${emailInput} is already in use.`
      });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashedPass = bcrypt.hashSync(passwordInput, salt);

    const userSubmission = {
      name: nameInput,
      username: usernameInput,
      email: emailInput,
      password: hashedPass,
      location: locationInput
    };

    const theUser = new User(userSubmission);

    theUser.save((err) => {
      if (err) {
        console.log(err);
        res.render('authentication/signup', {
          errorMessage: 'Something went wrong. Try again later.'
        });
        return;
      }

      res.redirect('/');
    });
  });
});

router.get('/logout', (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect('/');
    return;
  }

  req.session.destroy((err) => {
    if (err) {
      next(err);
      return;
    }
    res.redirect('/');
  });
});

//User Log in
router.get('/login', (req, res, next) => {
  res.render('authentication/login', {
    errorMessage: ''
  });
});

router.post('/login', (req, res, next) => {
  const emailInput = req.body.email;
  const passwordInput = req.body.password;

  if (emailInput === '' || passwordInput === '') {
    res.render('authentication/login', {
      errorMessage: 'Enter both email and password to log in.'
    });
    return;
  }

  User.findOne({ email: emailInput }, (err, theUser) => {
    if (err || theUser === null) {
      res.render('authentication/login', {
        errorMessage: `There isn't an account with email ${emailInput}.`
      });
      return;
    }

    if (!bcrypt.compareSync(passwordInput, theUser.password)) {
      res.render('authentication/login', {
        errorMessage: 'Invalid password.'
      });
      return;
    }

    req.session.currentUser = theUser;
    res.redirect('/');
  });
});

module.exports = router;
