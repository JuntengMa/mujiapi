const mongoose = require("mongoose")

mongoose.connect('mongodb://localhost/muji', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex:true
})
const db = mongoose.connection
db.on('error', () => {
  console.log("数据库连接失败")
})
db.once('open', () => {
  console.log("数据库连接成功")
})