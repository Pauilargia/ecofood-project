/*jshint esversion: 6*/

const express = require('express');
const router  = express.Router();

const User = require('../models/user');

router.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
    return;
  }
  res.redirect('/login');
});

router.get('/profile', (req, res, next) => {
  console.log(req.session.currentUser);
  res.render('users/profile');
});

router.post('/producers', (req, res, next) => {
  const userId = req.session.currentUser._id;
  const producerInfo = {
    isProducer: true
  };

  User.findByIdAndUpdate(userId, producerInfo, {new: true}, (err, theUser) => {
    if (err) {
      next(err);
      return;
    }

    req.session.currentUser = theUser;

    res.redirect('/profile');
  });
});

module.exports = router;
