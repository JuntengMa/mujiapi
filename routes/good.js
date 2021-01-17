var express = require('express');
var router = express.Router();
var verfiy = require('../utils/verfiy.js')
const goodModel = require('../db/goodModel.js');
const cateModel = require('../db/cateModel')

router.get('/cates', (req, res) => {
  cateModel.find({}).then((list) => {
    res.json(verfiy.setResult(0,'success',{list}))
  })
})

//http://10.36.149.52:3200/api/v1/good/add
router.post('/add', function (req, res) { 
  // 每次携带token添加
  verfiy.verifyToken(req, res).then(() => {
    let { name, desc, img, price, hot, cate } = req.body
    if (!name) return res.json(verfiy.setResult(1, "name是必填字段"))
    if (!desc) return res.json(verfiy.setResult(1, "desc是必填字段"))
    if (!img) return res.json(verfiy.setResult(1, "img是必填字段"))
    if (!price) return res.json(verfiy.setResult(1, "price是必填字段"))
    if (!cate) return res.json(verfiy.setResult(1, "cate是必填字段"))
    if (isNaN(price)) return res.json(verfiy.setResult(1, 'price必须是数字类型'))
    hot = hot || false
    let ele = {
      name,
      desc,
      img,
      price,
      hot,
      cate,
      rank: 0,
      create_time: Date.now(),
      status: 1
    }
    goodModel.insertMany([ele]).then(() => {
      res.json(verfiy.setResult(0, 'success'))
    })
  })
})

router.get('/del', function (req, res) { 
  let { id } = req.query
  if (!id) return res.json(verfiy.setResult(1, 'id是必填项'))
  
  goodModel.updateOne({ _id: id }, { $set: { status: 0 } }).then(() => {
    res.json(verfiy.setResult(0,'success'))
  })
})

router.post('/edit', function (req, res) {
  verfiy.verifyToken(req, res).then(() => {
    let { id, name, desc, img, price, hot, cate, rank } = req.body
    if (!id) return res.json(verfiy.setResult(1, "id是必填字段"))
    const ele = {
      name,
      desc,
      img,
      price,
      cate,
      hot,
      rank
    }
    Object.keys(ele).forEach((key) => {
      if (!ele[key]) {
        delete (ele[key])
      }
    })
    goodModel.updateOne({ _id: id }, { $set: ele }).then(() => {
      res.json(verfiy.setResult(0, '修改成功'))
    })
  })
 
})


router.post('/goodList', function (req, res) {
  verfiy.verifyToken(req, res).then(() => {
    let { name, cate, min_price, max_price, page, size, hot } = req.body
    const ele = {
      name,
      cate,
      hot
    }
    Object.keys(ele).forEach((key) => {
      if (!ele[key]) {
        delete (ele[key])
      }
    })
    // 使用正则过滤,可以模糊查询
    if (name) ele.name = new RegExp(name)
    min_price = min_price || 0
    max_price = max_price || 9000
    page = parseInt(page) || 1
    size = parseInt(size) || 10
    let reqF = { ...ele, price: { $gte: min_price, $lte: max_price } }
    goodModel.find(reqF).count().then((total) => {
      goodModel
        .find(reqF).skip((page - 1) * size).limit(size)
        .then((list) => {
          res.json(verfiy.setResult(0, 'success', { list, total }))
        })
    })


   
  })
})




module.exports = router;