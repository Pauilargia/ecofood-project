/*jshint esversion: 6*/

const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const bcryptSalt = 10;
const User = require('../models/user');
const Product = require('../models/product');

//Crear los ficheros de datos
const usersData = require('./data/usersdata');
const productsData = require('./data/productsdata');

mongoose.connect('mongodb://localhost/ecofood');

User.collection.drop();
Product.collection.drop();

User.create(usersData, (err, users) => {
  if(err) { throw err; }
  users.forEach((user) => {
  console.log(user.name);
  });
});

var promisesArrayProducts = productsData.map(p => {
  const promises = [
    User.findOne({location:p.location})
  ];

  return Promise.all(promises).then(user =>{
    p.producer = user[0]._id;
    console.log(p.producer);
    const product = new Product(p);
    return product.save();
  }).then( product => {
    // console.log("Created product!!");
    return product;
  }).catch(e => console.log(e));
});

Promise.all(promisesArrayProducts).then(products => {
  // console.log("ALL DONE");
  mongoose.connection.close();
});
