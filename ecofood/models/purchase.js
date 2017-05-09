/*jshint esversion: 6*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PurchaseSchema = new Schema ({
  date: Date,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  products: [{type: Schema.Types.ObjectId, ref: 'Product'}],
  quantities: [Number],
  units: [{type: String, enum: ["kg", "litro"]}],
  prices: [Number],
  total: Number
});

const Purchase = mongoose.model('Purchase', PurchaseSchema);
module.exports = Purchase;
