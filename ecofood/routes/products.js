/* jshint esversion:6 */
//Sergio
const express = require('express');
const router  = express.Router();
const Product = require('../models/product');

//FUNCIONA!!!
/* GET - ALL PRODUCTS */
router.get('/all', function(req, res, next) {
  Product.find({}, (err, products) => {
    if (err) { return next(err) }
    res.render('products/index', {products: products});
    //En ES6:
    //res.render('products/index', {products});
  });
});

/* GET - SINGLE PRODUCT */
router.get('/products/single/:id', (req,res) =>{
  let productId = req.params.id;
  Product.findById(productId, (err, product) => {
    if (err) { return next(err) }
    res.render('products/single', {product: product});
  });
});

/* GET - EDIT PRODUCT */
router.get('/products/:id/edit', (req,res, next) =>{
  const productId = req.params.id;
  Product.findById(productId, (err, product) => {
      if (err) { return next(err); }
      res.render('products/edit', {product: product});
  });
});
/* POST - EDIT PRODUCT */
router.post('/products/:id/edit', (req,res, next) =>{
  const productId = req.params.id;
  const updates = {
      name: req.body.name,
      imageUrl: req.body.imageUrl,
      unit: req.body.unit,
      unitPrice: req.body.unitPrice,
      category: req.body.category,
      availableQty: req.body.availableQty,
      deadline: req.body.deadline,
      location: req.body.location,
      producer: req.body.producer,
      description: req.body.description
   };
   Product.findByIdAndUpdate(productId, updates, (err, product) => {
     if (err){ return next (err); }
     return res.redirect('/all');
   });
})

/* GET -  PRODUCT CREATION FORM TO ADD PRODUCTS */
router.get('/add', (req,res) => {
  res.render('products/add');
});

/* POST - CREATE A PRODUCT */
router.post('/add', function(req, res, next) {
  const productInfo = {
      name: req.body.name,
      imageUrl: req.body.imageUrl,
      unit: req.body.unit,
      unitPrice: req.body.unitPrice,
      category: req.body.category,
      availableQty: req.body.availableQty,
      deadline: req.body.deadline,
      location: req.body.location,
      producer: req.body.producer,
      description: req.body.description
  };

  console.log(productInfo);

  const newProduct = new Product(productInfo);
  newProduct.save( (err) => {
    if (err) { return next(err) }
    return res.redirect('/all');
  });
});

//FUNCIONA!!!
/* GET - DELETE PRODUCT */
router.get('/products/:id/delete', (req, res)=>{
  const productId = req.params.id;
  Product.findByIdAndRemove(productId,(err, product) => {
    res.redirect('/all');
  })
});

module.exports = router;
