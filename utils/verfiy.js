const jwt = require("jsonwebtoken")


//统一返回格式
function setResult(err, msg , data) { 
  return {
    err,
    msg,
    data,
  }
}


function createToken(data) {
  return jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),   //token 过期时间
    data                //加密的用户信息
  }, 'guest');         //密钥
}

function verifyToken(req, res) {
  return new Promise((resolve, rejected) => {
    const token = req.headers.authorization
    if (!token) {
      res.json(setResult(-1,"token不存在"))
    } else {
      try {
        var decoded = jwt.verify(token, 'guest');
        console.log(decoded)
        resolve(decoded)
      } catch (err) {
        // rejected(err)
        res.json(setResult(-1,"token无效"))
      }
    }
  })
  
}


// console.log(createToken({ username: "大美妞", password: "12345", sex: "仙女" }))
//生成的token  两点三段
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTA2MTgwNDksImRhdGEiOnsidXNlcm5hbWUiOiLlpKfnvo7lpp4iLCJwYXNzd29yZCI6IjEyMzQ1Iiwic2V4Ijoi5LuZ5aWzIn0sImlhdCI6MTYxMDYxNDQ0OX0.Xgxig7YHcsd62rs4wNa9fax_cOV-3UArZyGU916Gk54

// console.log()


module.exports = {
  setResult,
  createToken,
  verifyToken
}