
const Koa = require('koa')
const app = new Koa()
// const mongoose = require('mongoose')
const Router = require('koa-router')
let user = require('./appApi/user.js')
let goods = require('./appApi/goods.js')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')

app.use(cors()) // 解决跨域
app.use(bodyParser()) // bodyParse中间件

// 引入connect
const { connect, initSchemas } = require('./database/init.js')
// 立即执行函数
;(async () => {
  await connect() // 连接数据库
  initSchemas() // mongoose建模

  let router = new Router()
  router.use('/user', user.routes())
  router.use('/goods', goods.routes())
  app.use(router.routes())
  app.use(router.allowedMethods())

  app.use(async ctx => {
    ctx.body = '<h1>hello Koa2</h1>'
  })
  app.listen(3000, _ => {
    console.log('[Server] starting at port 3000')
  })
})()
