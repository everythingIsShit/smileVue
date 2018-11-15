
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
    // 从商品中随机选择20个作为热门商品
    let randomNum = []
    for (let i = 0; i < 20; i++) {
      let num = Math.floor(Math.random() * 50)
      if (randomNum.includes(num)) {
        i--
      } else {
        randomNum.push(i)
      }
    }
    data.forEach(async (value, index) => {
      if (randomNum.includes(index)) {
        value.HOT = true
      } else {
        value.HOT = false
      }
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

// 根据数据库数据生成json文件
router.get('/getGoodsJson', async ctx => {
  const Goods = mongoose.model('goods')
  let result = await Goods.find().exec()
  console.log(result.length)
  await fs.writeFile('./jsonData/json/newGoods.json', JSON.stringify(result), err => {
    if (err) console.log('写文件操作失败')
    else {
      ctx.body = result
      console.log('写文件操作成功')
    }
  })
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

// 获取首页初始化数据
router.get('/getInitData', async ctx => {
  let data = {
    category: [],
    slides: [],
    recommend: [],
    hotGoods: [],
    floor: []
  }
  const Goods = mongoose.model('goods')
  const Category = mongoose.model('category')
  await Category.find().exec().then(result => {
    if (result) {
      data.category = result
      data.floor = data.data.category.slice(0, 3)
    } else {
      ctx.body = {code: 500, message: '类别搜索出错'}
    }
  }).catch(err => {
    ctx.body = {code: 500, message: err}
  })

  await Goods.find().exec().then(goods => {
    if (goods) {
      goods.forEach(item => {
        // 添加顶部轮播商品
        if (item.STATE) {
          data.slides.push(item)
        }
        // 添加推荐商品
        if (item.IS_RECOMMEND) {
          data.recommend.push(item)
        }
        // 添加热门商品
        if (item.HOT) {
          data.hotGoods.push(item)
        }
        // 添加楼层数据
        data.floor.forEach(floor => {
          if (item.SUB_ID === floor.ID) {
          }
        })
      })
      data.slides = data.slides.slice(0, 3)
    } else {
      ctx.body = {code: 500, message: '商品搜索出错'}
    }
  }).catch(err => {
    ctx.body = {code: 500, message: err}
  })

  ctx.body = {code: 200, message: '', data: data}
})

// 获取楼层数据
router.get('/getFloorData', async ctx => {
  await fs.readFile(path.resolve(__dirname, '../jsonData/json/floor.json'), 'utf8', (err, data) => {
    if (err) {
      ctx.body = {code: 500, message: 'err'}
      console.log(err)
      return
    }
    console.log(data)
    ctx.body = {code: 200, message: '', data: data}
  })
  ctx.body = {code: 200, message: '123'}
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

// 根据查询条件获取商品列表
router.post('/getGoodsList', async ctx => {
  try {
    let cateId = ctx.request.body.cateId
    const content = ctx.request.body.content
    let query = {}
    if (cateId) {
      query.SUB_ID = cateId
    }
    if (content) {
      const reg = new RegExp(content, 'i')
      query.NAME = {$regex: reg}
    }
    let page = ctx.request.body.page
    let num = 10 // 每页显示数量
    let start = (page - 1) * num
    const Goods = mongoose.model('goods')
    let result = await Goods.find(query).skip(start).limit(num).exec()
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
