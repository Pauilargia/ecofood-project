/* jshint esversion:6 */
//Sergio
const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const Product = require('../models/product');

const upload = multer({ dest: './public/images/' }); //COMPROBAR RUTA!!

router.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
    return;
  }
  res.redirect('/login');
});

//FUNCIONA!!!
/* GET - ALL PRODUCTS */
router.get('/all', function(req, res, next) {
  Product.find({}, (err, products) => {
    if (err) { return next(err); }
    res.render('products/index', {products: products});
    //En ES6:
    //res.render('products/index', {products});
  });
});

/* GET - SINGLE PRODUCT */
router.get('/products/single/:id', (req,res, next) =>{
  const productId = req.params.id;
  Product.findById(productId, (err, product) => {
    if (err) { return next(err); }
    //{product: product} simpre hay que pasar un objeto no un stream por eso ponemos las {}
    res.render('products/single', {product: product});
  });
});

/* GET - EDIT PRODUCT */
router.get('/products/:id/edit', (req,res, next) =>{

  const productId = req.params.id;
  Product.findById(productId, (err, product) => {
      if (err) { return next(err); }
      if(product.producer!=req.session.currentUser._id){
        res.redirect('/');
      }
      res.render('products/edit', {product: product});
  });
});
/* POST - EDIT PRODUCT */
router.post('/products/:id/edit', upload.single('image'), (req,res, next) => {
  const productId = req.params.id;
  console.log(req.file);
  const {name,unit,unitPrice,category,availableQty,deadline,location,description} = req.body;
  const upddates = {
      name,
      unit,
      unitPrice,
      category,
      availableQty,
      deadline,
      location,
      description
   };
   console.log(updates);
   Product.findByIdAndUpdate(productId, updates, (err, product) => {
     if (err){ return next (err); }
     return res.redirect('/profile');
   });
});

/* GET -  PRODUCT CREATION FORM TO ADD PRODUCTS */
router.get('/add', (req,res) => {
  res.render('products/add');
});

/* POST - CREATE A PRODUCT */
router.post('/add', upload.single('image'), function(req, res, next) {
  const productInfo = {
      name: req.body.name,
      imageUrl: "images/"+req.file.filename,
      imageUrlName: req.file.originalname,
      unit: req.body.unit,
      unitPrice: req.body.unitPrice,
      category: req.body.category,
      availableQty: req.body.availableQty,
      deadline: req.body.deadline,
      location: req.body.location,
      producer: req.user._id,
      description: req.body.description
  };

  console.log(productInfo);

  const newProduct = new Product(productInfo);
  newProduct.save( (err) => {
    if (err) { return next(err); }
    return res.redirect('/profile');
  });
});

//FUNCIONA!!!
/* GET - DELETE PRODUCT */
router.get('/products/:id/delete', (req, res)=>{
  const productId = req.params.id;
  Product.findByIdAndRemove(productId,(err, product) => {
    res.redirect('/profile');
  });
});

module.exports = router;
