const mongoose = require('mongoose') // 引入Mongoose
const Schema = mongoose.Schema // 声明Schema

// 创建用户Schema
const categorySchema = new Schema({
  ID: String,
  MALL_CATEGORY_NAME: {type: String},
  IMAGE: {type: String},
  TYPE: {type: Number},
  SORT: {type: Number},
  COMMENTS: {type: String}
}, {
  collection: 'category'
})

mongoose.model('category', categorySchema)
