/*jshint esversion: 6*/

const express = require('express');
const router  = express.Router();

const Product = require('../models/product');

/* GET home page. */
router.get('/', (req, res, next) => {
  // console.log("AQUI!!!! " + req.body.provincia);
    Product
      .find({})
      .populate('producer')
      .exec( (err, products) => {
        // console.log(products);
        res.render('index', { products });
      });
});

router.post('/provincia', (req, res, next) => {
  console.log("AQUI!!!! " + req.body.provincia);
  const idProvincia = req.body.provincia;
    Product
      .find({location: idProvincia})
      .populate('producer')
      .exec( (err, products) => {
        console.log(products);
          res.render('index', {products});
      });
  // }
});

// router.get('/provincia', (req, res, next) => {
//     const idProvincia = req.params.idProvincia;
//     // Product
//     //   .find({provincia: idProvincia})
//     //   .populate('producer')
//     //   .exec( (err, products) => {
//     //     console.log(products);
//         res.render('index', { products });
//       // });
// });

module.exports = router;
