
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
  // 判断用户名是否已经被占用
  await User.findOne({username: ctx.request.body.username}).exec().then(async result => {
    if (result) {
      ctx.body = {
        code: 500,
        message: '用户名被占用'
      }
    } else {
      // 把从前端接收的POST数据封装成一个新的user对象
      let newUser = new User(ctx.request.body)
      // 用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
      await newUser.save().then(user => {
        ctx.body = {
          code: 200,
          token: jsonwebtoken.sign({
            userId: user._id,
            // 设置 token 过期时间
            exp: Math.floor(Date.now() / 1000) + (60 * 60)
          }, secret),
          message: '注册成功'
        }
      }).catch(err => {
        ctx.body = {
          code: 500,
          message: err
        }
      })
    }
  })
})

// 登录
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
        const exist = result.cart.find(item => item.goodsid === goodsId)
        if (exist) {
          exist.count += 1
          ctx.body = {code: 500, message: '该商品已经在您的购物车了'}
        } else {
          result.cart.push({goodsId, count: 1})
        }
        // 更新用户购物车
        await User.updateOne({_id: userId}, {$set: {cart: result.cart}}, function (err) {
          if (err) {
            ctx.body = {code: 500, message: err}
          } else {
            ctx.body = {code: 200, message: '商品添加成功', data: result.cart}
          }
        })
      } else {
        ctx.body = {code: 500, message: '查找不到用户，请重新登录'}
      }
    })
  } catch (err) {
    console.log(err)
    ctx.body = {code: 500, message: err}
  }
})

// 获取购物车商品列表
router.post('/getGoodsByUseId', async ctx => {
  try {
    const credentials = ctx.header.authorization.split(' ')[1]
    const userId = await jwt.verify(credentials, secret).userId
    const User = mongoose.model('UserObj')
    const Goods = mongoose.model('goods')
    // 检查用户名是否存在
    await User.findOne({_id: userId}).exec().then(async result => {
      if (result) {
        // 这里根据goodsId批量查找数据
        let goodsList = []
        for (let cart of result.cart) {
          await Goods.findOne({ID: cart.goodsId}).exec().then(goods => {
            if (goods) {
              goods._doc.COUNT = cart.count
              goodsList.push(goods)
            } else {
              console.error(new Error(`id【${cart.goodsId}】的商品未找到`))
            }
          })
        }
        ctx.body = {code: 200, message: '', data: goodsList}
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
