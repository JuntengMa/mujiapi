const mongoose = require("mongoose")
const { Schema } = mongoose

//创建一个model实例,使用model实例操作数据库
module.exports = mongoose.model('users', new Schema({
  userName: String,
  password: String,
  create_time: Number
}))
