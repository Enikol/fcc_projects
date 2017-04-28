var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var stockData = new Schema({
  stock: String,
  price: String,
  likes: Number,
  ips: [String]
})

module.exports = mongoose.model('stockData', stockData);