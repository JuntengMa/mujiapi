var express = require('express');
var router = express.Router();
var verfiy = require('../utils/verfiy.js')
const userModel = require('../db/userModel')
const md = require("md5")

//用户api
router.post('/userResgit', function (req, res) {
  let { userName, password, password2 } = req.body
  if (!userName) return res.json(verfiy.setResult(-1, '用户名不能为空'))
  // let telStr = /^[1]([3|5|7|8|9])[0-9]{9}$/
  // if (!userName) {
  //   return res.json(verfiy.setResult(-1, '手机号码不能为空'))
  // }
  // if (!telStr.test(userName)) {
  //     return res.json(verfiy.setResult(-1, '手机号码格式错误'))
  // }
  //密码必须符合由数字,大写字母,小写字母,至少其中两种组成，且长度不小于8，同时第一位不能为数字
  let passStr = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)\S{8,}$/;
  if (!(password ||password2))return res.json(verfiy.setResult(-1, "密码不能为空"))
  if (password.length < 7) {
    return res.json(verfiy.setResult(-1, "密码长度不能小于8位"))
  } else if (!(isNaN(password[0]))) {
    return res.json(verfiy.setResult(-1, "密码第一位不能为数字"))
  }else if (!(passStr.test(password))) {
    return res.json(verfiy.setResult(-1, "密码必须由数字,大写字母,小写字母,至少其中两种组成"))
  } else if(password2 != password) {
    return res.json(verfiy.setResult(-1, "两次密码输入不一致"))
  }
  userModel.find({ userName }).then(arr => {
    if (arr.length === 0) {
      var ele = {
        userName,
        password:md(password),
        create_time: Date.now()
      }
      userModel.insertMany([ele]).then(() => {
        res.json(verfiy.setResult(1, "注册成功", userName))
      })
    } else {
      res.json(verfiy.setResult(0, `${userName}已被注册`))
    }
  })
  
  // res.json(verfiy.setResult(1, 'success'))
})
router.post('/userLogin', function (req, res) { 
  let { userName, password } = req.body
  //let telStr = /^[1]([3|5|7|8|9])[0-9]{9}$/

  
  if (!userName) return res.json(verfiy.setResult(-1, '用户名不能为空'))
  //if (!telStr.test(userName)) return res.json(verfiy.setResult(-1, "手机号格式错误"))
  
  if (!(password)) return res.json(verfiy.setResult(-1, "密码不能为空"))

  userModel.find({ userName, password: md(password) }).then((arr) => {
    if (arr.length === 1) {
      let token = verfiy.createToken({
        userName,
        password:md(password)
      })
      res.json(verfiy.setResult(0,'登录成功',{token}))
    } else {
      res.json(verfiy.setResult(-1, `${userName}不存在`))
    }
    
  })
})


module.exports = router;
