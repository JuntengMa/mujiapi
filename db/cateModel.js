const mongoose = require("mongoose")
const { Schema } = mongoose

module.exports = mongoose.model('cates', new Schema({
  cate: String,
  cate_zh:String

}))