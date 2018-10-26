const mongoose = require('mongoose') // 引入Mongoose
const Schema = mongoose.Schema // 声明Schema

// 创建用户Schema
const goodsSchema = new Schema({
  ID: String,
  GOODS_SERIAL_NUMBER: String,
  SHOP_ID: String,
  SUB_ID: String,
  GOOD_TYPE: Number,
  STATE: Number,
  NAME: String,
  ORI_PRICE: Number,
  PRESENT_PRICE: Number,
  AMOUNT: Number,
  DETAIL: String,
  BRIEF: String,
  SALES_COUNT: Number,
  IMAGE1: String,
  IMAGE2: String,
  IMAGE3: String,
  IMAGE4: String,
  IMAGE5: String,
  ORIGIN_PLACE: String,
  GOOD_SCENT: String,
  CREATE_TIME: String,
  UPDATE_TIME: String,
  IS_RECOMMEND: Number,
  PICTURE_COMPERSS_PATH: String
}, {
  collection: 'goods'
})

mongoose.model('goods', goodsSchema)
