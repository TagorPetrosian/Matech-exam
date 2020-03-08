const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//title, price, availability, rating, avg, max, min
const priceSchema = new Schema({
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const productSchema = new Schema({
  // _user: { type: Schema.Types.ObjectId, ref: 'user' },
  asin: { type: String, required: true },
  title: { type: String, required: true },
  prices: [priceSchema],
  availability: { type: String, required: true },
  rating: { type: Number, required: true },
  dateAdded: { type: Date, default: Date.now }
});

const ModelClass = mongoose.model('product', productSchema);

module.exports = ModelClass;
