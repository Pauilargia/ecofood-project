/*jshint esversion: 6*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema ({
  name: {type: String, required: true},
  imageUrl: String,
  imageUrlName: String,
  unit: {type: String, required: false, enum: ["kg", "litro"]},
  unitPrice: {type: Number, required: false},
  category: {type: String, enum: ["Fruits", "Vegetables", "Animal Products"]},
  availableQty: Number,
  deadline: Date,
  location: String,
  producer: { type: Schema.Types.ObjectId, ref: 'User' },
  //producer: Date,
  description: String
});


const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
