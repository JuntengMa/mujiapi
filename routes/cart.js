var express = require('express');
var router = express.Router();
var verfiy = require('../utils/verfiy.js');
const cartModel = require('../db/cartModel');
const goodModel = require('../db/goodModel.js');


router.post('/add', function (req,res) {
  let { good_id, num } = req.body
  if (!good_id) return res.json(verfiy.setResult(-1, 'good_id是必填项'))

  num = num || 1
  cartModel.find({good_id:good_id}).then(arr => {
    if (arr.length === 0) {
      cartModel.insertMany([{ good_id:good_id,num:num}]).then(() => {
       res.json(verfiy.setResult(0,'success'))
     })
    } else {
      cartModel.updateOne({ good_id: good_id }, { $set: { num:num+1} } ).then(() => {
        res.json(verfiy.setResult(0, '添加成功'))
      })
    }
  })
})

// router.post('/submit', ((req, res) => {
//   let { goods } = req.body
//   if (!goods) return res.json(verfiy.setResult(-1, 'goods是必填字段'))
//   let goodArr = goods.split(';')
//   // goodArr.map((item, index, arr) => {
//   //   goodModel.find({ _id: item }).then(() => {
//   //   //   cartModel.insertMany([{ good_id: good_id }]).then(() => {
//   //   //     res.json(verfiy.setResult(0, 'success'))
//   //   //   }
//   //   // })
     
//   // })
//   goodArr.map(item => {
//     goodModel.find({})
//   })

// }))




module.exports = router;