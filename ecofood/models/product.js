/*jshint esversion: 6*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema ({
  name: {type: String, required: true},
  imageUrl: String,
  imageUrlName: String,
  unit: {type: String, required: false, enum: ["kg", "litro", "unit"]},
  unitPrice: {type: Number, required: false},
  category: {type: String, enum: ["Fruits", "Vegetables", "Animal Products"]},
  availableQty: Number,
  deadline: Date,
  location: String,
  producer: { type: Schema.Types.ObjectId, ref: 'User' },
  description: String
});

//Product en verde es el nombre de la colección.
const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
