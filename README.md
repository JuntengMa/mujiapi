# 接口文档

### 注册
+ /api/v1/users/userResgit
+ 参数: userPhone,userPassword,userPassword2  全必填


### 登录接口   
+ /api/v1/users/userLogin 
+ 参数: userPhone,Password  全必填




### md5
+ 密码加密技术
+ yarn add md5 -S
+ 不可逆,无法解密


### JWT JSON WEB TOKEN
+ 两点三段,
+ 第一段加密时间
+ 第二段自定义的信息,登录时将用户信息生成的token放在第二段
+ 第三段,暗号,解密时用到这个暗号

+ jsonwebtoken -S
