var express = require('express');
var router = express.Router();



//可在这写,可渲染视图模板,前后端不分离项目
router.get('/phoneLogin', function (req, res) { 
  
  // // let phone = req.body.phone;
  // // let password = req.body.password
  // // if (user[phone] === password) {
  //   // userModel.find({ userPhone: 13012341234 },{userPhone:1,userName:1,_id:0}).then((arr) => {
  //   //   // console.log("arr", arr)
  //   //   // res.json({ err: 0, msg: 'success', data: arr })
  //   //   //用户名存在
  //   //   //用户名不存在
     
  //   // })
  // userModel.save({ userPhone: 12312341234, password: 123456 }).then(() => {
  //   res.json({ err: 0, msg: 'success' })
  // })
  // // }
})


module.exports = router;
