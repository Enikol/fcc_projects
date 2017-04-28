var  mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var IP = new Schema({
  address: String,
  liked: [String]
})

module.exports = mongoose.model('IP', IP);