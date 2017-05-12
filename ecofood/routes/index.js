/*jshint esversion: 6*/
const express = require('express');
const router  = express.Router();

const Product = require('../models/product');

/* GET home page. */
router.get('/', (req, res, next) => {
  const idProvincia = "";
  Product
    .find({})
    .populate('producer')
    .exec( (err, products) => {
      res.render('index', { products: products, idProvincia: idProvincia });
    });
});

router.post('/provincia', (req, res, next) => {
  const idProvincia = req.body.provincia;
  if(idProvincia===""){
    Product
      .find({})
      .populate('producer')
      .exec( (err, products) => {
        res.render('index', { products: products, idProvincia: idProvincia });
      });
  } else {
    Product
      .find({location: idProvincia})
      .populate('producer')
      .exec( (err, products) => {
        res.render('index', { products: products, idProvincia: idProvincia });
      });
  }
});

module.exports = router;
