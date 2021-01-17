var express = require('express');
var router = express.Router();
var verfiy = require('../utils/verfiy.js')
var multiparty = require('multiparty');
const fs = require('fs')
const path = require('path')

router.post('/uploadFile', ((req, res) => {
  var form = new multiparty.Form();
  form.parse(req, function (err, fields, files) { 
    if (err) return res.json(verfiy.setResult(1, '图片上传失败'))
    let img = files.upImg[0]
    let fileName = Date.now() +'-'+ img.originalFilename
    const readStream = fs.createReadStream(img.path)
    const wirteStream = fs.createWriteStream(path.resolve(__dirname, `../public/upload/${fileName}`))
    readStream.pipe(wirteStream)
    wirteStream.on('close', () => {
      res.json(verfiy.setResult(0, "图片上传成功", { url: '/upload/' + fileName }))
    })   
  })
}))





module.exports = router;