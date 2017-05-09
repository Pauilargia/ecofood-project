/*jshint esversion: 6*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema ({
  name: {type: String, required: true},
  imageUrl: String,
  unit: {type: String, required: true, enum: ["kg", "litro", "unit"]},
  unitPrice: {type: Number, required: true},
  category: {type: String, required: true, enum: ["Fruits", "Vegetables", "Animal Products"]},
  availableQty: Number,
  deadline: Date,
  location: String,
  producer: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
