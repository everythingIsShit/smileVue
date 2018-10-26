
const mongoose = require('mongoose')
const Router = require('koa-router')
let router = new Router()

router.get('/', async ctx => {
  ctx.body = '这是用户操作首页'
})

// 用户注册
router.post('/register', async ctx => {
  // 取得Model
  const User = mongoose.model('UserObj')
  // 把从前端接收的POST数据封装成一个新的user对象
  let newUser = new User(ctx.request.body)
  // 用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
  await newUser.save().then(_ => {
    ctx.body = {
      code: 200,
      message: '注册成功'
    }
  }).catch(err => {
    ctx.body = {
      code: 500,
      message: err
    }
  })
})

router.post('/login', async ctx => {
  let loginUser = ctx.request.body
  let userName = loginUser.userName
  let password = loginUser.password
  // 引入User的model
  const User = mongoose.model('UserObj')
  // 检查用户名是否存在
  await User.findOne({username: userName}).exec().then(async result => {
    if (result) {
      let loginUser = new User()
      await loginUser.comparePassword(password, result.password).then(isMatch => {
        if (!isMatch) {
          ctx.body = {code: 500, message: '密码错误'}
        } else {
          ctx.body = {code: 500, message: '登录成功'}
        }
      }).catch(error => {
        // 出现异常，返回异常
        ctx.body = {code: 500, message: error}
      })
    } else {
      ctx.body = {code: 500, message: '用户名不存在'}
    }
  }).catch(err => {
    ctx.body = {code: 500, message: err}
  })
})

module.exports = router
