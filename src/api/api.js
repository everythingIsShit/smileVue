
import request from '../utils/request'

const BASEURL = 'https://www.easy-mock.com/mock/5bce8c8d98c3e07240b7e110/example/'
const LOCAL = true
const LOCALURL = LOCAL ? 'http://192.168.191.1:443/' : 'http://47.107.98.115:443/'

const URL = {
  getInitData: LOCALURL + 'goods/getInitData',
  getGoodsInfo: BASEURL + 'getFoodsList',
  registerUser: LOCALURL + 'user/register',
  login: LOCALURL + 'user/login',
  getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo',
  getCateList: LOCALURL + 'goods/getCateList',
  getCateSubList: LOCALURL + 'goods/getCateSubList',
  getGoodsList: LOCALURL + 'goods/getGoodsList',
  addToCart: LOCALURL + 'user/addGoodsToCart',
  getGoodsByUseId: LOCALURL + 'user/getGoodsByUseId',
  getAddressList: LOCALURL + 'user/getAddressList',
  addAddress: LOCALURL + 'user/addAddress',
  setDefaultAddress: LOCALURL + 'user/setDefaultAddress',
  editAddress: LOCALURL + 'user/editAddress'
}

export default {
  // 获取初始化数据
  getInitData () {
    return request.get(URL.getInitData)
  },
  // 获取商品列表
  getGoodsInfo () {
    return request.get(URL.getGoodsInfo)
  },
  // 用户注册
  registerUser (params) {
    return request.post(URL.registerUser, params)
  },
  // 用户登录
  login (params) {
    return request.post(URL.login, params)
  },
  // 获取商品详情
  getDetailGoodsInfo (params) {
    return request.post(URL.getDetailGoodsInfo, params)
  },
  // 获取所有商品分类
  getCateList () {
    return request.get(URL.getCateList)
  },
  // 获取所有商品分类子类
  getCateSubList (params) {
    return request.post(URL.getCateSubList, params)
  },
  // 根据商品小类获取商品列表
  getGoodsList (params) {
    return request.post(URL.getGoodsList, params)
  },
  // 添加至购物车
  addToCart (params) {
    return request.post(URL.addToCart, params)
  },
  // 获取购物车商品列表
  getGoodsByUseId (params) {
    return request.post(URL.getGoodsByUseId, params)
  },
  // 获取地址列表
  getAddressList () {
    return request.get(URL.getAddressList)
  },
  // 添加新地址
  addAddress (params) {
    return request.post(URL.addAddress, params)
  },
  // 设置默认地址
  setDefaultAddress (params) {
    return request.post(URL.setDefaultAddress, params)
  },
  // 编辑修改地址
  editAddress (params) {
    return request.post(URL.editAddress, params)
  },
}
