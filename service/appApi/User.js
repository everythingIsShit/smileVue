
const mongoose = require('mongoose')
const Router = require('koa-router')
const jsonwebtoken = require('jsonwebtoken')
const jwt = require('jsonwebtoken')
const secret = require('../config/secret').secret

const router = new Router()

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
  let userName = ctx.request.body.username
  let password = ctx.request.body.password
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
          ctx.body = {
            code: 200,
            // 生成 token 返回给客户端
            token: jsonwebtoken.sign({
              userId: result._id,
              // 设置 token 过期时间
              exp: Math.floor(Date.now() / 1000) + (60 * 60)
            }, secret),
            message: '登录成功'
          }
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

// 添加商品至购物车
router.post('/addGoodsToCart', async ctx => {
  try {
    const goodsId = ctx.request.body.goodsId
    const credentials = ctx.header.authorization.split(' ')[1]
    const userId = await jwt.verify(credentials, secret).userId
    const User = mongoose.model('UserObj')
    // 检查用户名是否存在
    await User.findOne({_id: userId}).exec().then(async result => {
      if (result) {
        // 检查购物车中是否存在将要添加的商品id
        if (result.cart.includes(goodsId)) {
          ctx.body = {code: 500, message: '该商品已经在您的购物车了'}
        } else {
          result.cart.push(goodsId)
          // 更新用户购物车
          await User.updateOne({_id: userId}, {$set: {cart: result.cart}}, function (err) {
            if (err) {
              ctx.body = {code: 500, message: err}
            } else {
              ctx.body = {code: 200, message: '商品添加成功', data: result.cart}
            }
          })
        }
      } else {
        ctx.body = {code: 500, message: '查找不到用户，请重新登录'}
      }
    })
  } catch (err) {
    console.log(err)
    ctx.body = {code: 500, message: err}
  }
})

module.exports = router
