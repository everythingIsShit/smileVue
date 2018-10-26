
const Router = require('koa-router')
const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')

let router = new Router()

// 插入所有商品
router.get('/insertAllGoodsInfo', async ctx => {
  console.log('开始导入商品数据')
  fs.readFile(path.resolve(__dirname, '../jsonData/json/newGoods.json'), 'utf8', (err, data) => {
    if (err) {
      console.log(err)
      return
    }
    data = JSON.parse(data)
    let saveCount = 0
    const Goods = mongoose.model('goods')
    data.forEach(async value => {
      let newGoods = new Goods(value)
      await newGoods.save().then(_ => {
        saveCount++
      }).catch(err => {
        console.log(err)
      })
      console.log('成功' + saveCount)
    })
  })
  ctx.body = '开始导入数据'
})

// 插入分类
router.get('/insertAllCategory', async ctx => {
  fs.readFile(path.resolve(__dirname, '../jsonData/json/category.json'), 'utf8', (err, data) => {
    if (err) {
      console.log(err)
      return
    }
    let saveCount = 0
    data = JSON.parse(data)
    const Category = mongoose.model('category')
    data.RECORDS.forEach(async value => {
      console.log(value)
      let newCategory = new Category(value)
      await newCategory.save().then(_ => {
        saveCount++
      }).catch(err => {
        console.log(err)
      })
      console.log('成功' + saveCount)
    })
  })
  ctx.body = '开始导入数据'
})

// 插入分类子类
router.get('/insertAllCategorySub', async ctx => {
  fs.readFile(path.resolve(__dirname, '../jsonData/json/category_sub.json'), 'utf8', (err, data) => {
    if (err) {
      console.log(err)
      return
    }
    let saveCount = 0
    data = JSON.parse(data)
    const Category = mongoose.model('CategorySub')
    data.RECORDS.forEach(async value => {
      console.log(value)
      let newCategory = new Category(value)
      await newCategory.save().then(_ => {
        saveCount++
      }).catch(err => {
        console.log(err)
      })
      console.log('成功' + saveCount)
    })
  })
  ctx.body = '开始导入数据'
})

// 获取商品详情
router.post('/getDetailGoodsInfo', async ctx => {
  const goodsId = ctx.request.body.goodsId
  const Goods = mongoose.model('goods')
  await Goods.findOne({ID: goodsId}).exec().then(result => {
    if (result) {
      ctx.body = {code: 200, message: '', data: result}
    } else {
      ctx.body = {code: 500, message: '未找到商品信息'}
    }
  }).catch(err => {
    ctx.body = {code: 500, message: err}
  })
})

// 获取所有商品分类
router.get('/getCateList', async ctx => {
  try {
    const Category = mongoose.model('category')
    let result = await Category.find().exec()
    if (result) {
      ctx.body = {code: 200, message: '', data: result}
    } else {
      ctx.body = {code: 500, message: '未获取到商品分类'}
    }
  } catch (err) {
    ctx.body = {code: 500, message: err}
  }
})

// 读取小类别
router.post('/getCateSubList', async ctx => {
  try {
    let categoryId = ctx.request.body.cateId
    const CategorySub = mongoose.model('CategorySub')
    let result = await CategorySub.find({MALL_CATEGORY_ID: categoryId}).exec()
    if (result) {
      ctx.body = {code: 200, message: '', data: result}
    } else {
      ctx.body = {code: 500, message: '未获取到商品小类'}
    }
  } catch (err) {
    ctx.body = {code: 500, message: err}
  }
})

// 根据商品小类获取商品列表
router.post('/getGoodsListByCateId', async ctx => {
  try {
    let cateId = ctx.request.body.cateId
    let page = ctx.request.body.page
    let num = 10 // 每页显示数量
    let start = (page - 1) * num
    const Goods = mongoose.model('goods')
    let result = await Goods.find({SUB_ID: cateId}).skip(start).limit(num).exec()
    if (result) {
      ctx.body = {code: 200, message: '', data: result}
    } else {
      ctx.body = {code: 500, message: '未获取到商品分类'}
    }
  } catch (err) {
    console.log(err)
    ctx.body = {code: 500, message: err}
  }
})

module.exports = router
