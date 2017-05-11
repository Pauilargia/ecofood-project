/*jshint esversion: 6*/

const express = require('express');
const router  = express.Router();

const User = require('../models/user');
const Product = require('../models/product');

router.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
    return;
  }
  res.redirect('/login');
});

router.get('/profile', (req, res, next) => {
  //console.log("nombre: " + req.session.currentUser.name);
  Product
    .find({"producer": req.session.currentUser._id})
    .populate('producer')
    .exec( (err, products) => {
      res.render('users/profile', { products });
    });
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
