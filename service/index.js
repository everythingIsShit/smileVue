
const Koa = require('koa')
const Router = require('koa-router')
let user = require('./appApi/user.js')
let goods = require('./appApi/goods.js')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const jwt = require('koa-jwt')
const secret = require('./config/secret').secret

const router = new Router()
const app = new Koa()

app.use(cors()) // 解决跨域
app.use(bodyParser()) // bodyParse中间件

/* 当token验证异常时候的处理，如token过期、token错误 */
app.use(function (ctx, next) {
  return next().catch(err => {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = 'token验证过期，请重新登录'
    } else {
      throw err
    }
  })
})

app.use(jwt({
  secret
}).unless({
  path: [/\/user\/register/, /\/user\/login/]
}))

// 引入connect
const { connect, initSchemas } = require('./database/init.js')
// 立即执行函数
;(async () => {
  await connect() // 连接数据库
  initSchemas() // mongoose建模

  router.use('/user', user.routes())
  router.use('/goods', goods.routes())
  app.use(router.routes()).use(router.allowedMethods())

  app.listen(3000, _ => {
    console.log('[Server] starting at port 3000')
  })
})()
