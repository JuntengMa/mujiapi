const mongoose = require("mongoose")
const { Schema } = mongoose

module.exports = mongoose.model('cart', new Schema({
  name: String,
  desc: String,
  price: Number,
  img: String,
  num: Number,
  good_id:String,

  rank: Number,
  status: Number,
  create_time: Number

}))