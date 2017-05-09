/*jshint esversion: 6*/

const express = require('express');
const router  = express.Router();

const Product = require('../models/product');

/* GET home page. */
router.get('/', (req, res, next) => {
  // res.render('index');
  Product
    .find({})
    .populate('producer')
    .exec( (err, products) => {
        res.render('index', { products });
    });
});

module.exports = router;
