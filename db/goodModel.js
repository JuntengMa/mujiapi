const mongoose = require("mongoose")
const { Schema } = mongoose

module.exports = mongoose.model('goods', new Schema({
  name: String,
  desc: String,
  price: Number,
  img: String,
  cate: String,
  hot: Boolean,

  rank: Number,
  status:Number,
  create_time:Number
  
}))
