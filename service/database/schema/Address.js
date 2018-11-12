const mongoose = require('mongoose') // 引入Mongoose
const Schema = mongoose.Schema // 声明Schema

// 创建用户Schema
const addressSchema = new Schema({
  addressId: Schema.Types.ObjectId,
  userId: String,
  telephone: String, // 电话
  contacts: String, // 联系人
  address: String, // 省市县地址
  addressDetail: String, // 街道地址
  areaCode: String, // 地区编码
  defaultAddress: Boolean // 是否设为默认地址
}, {
  collection: 'address'
})

mongoose.model('address', addressSchema)
