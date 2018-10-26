
import request from '../utils/request'

const BASEURL = 'https://www.easy-mock.com/mock/5bce8c8d98c3e07240b7e110/example/'
const LOCALURL = 'http://192.168.191.1:3000/'

const URL = {
  getShoppingMallInfo: BASEURL + 'index',
  getGoodsInfo: BASEURL + 'getFoodsList',
  registerUser: LOCALURL + 'user/register',
  login: LOCALURL + 'user/login',
  getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo',
  getCateList: LOCALURL + 'goods/getCateList',
  getCateSubList: LOCALURL + 'goods/getCateSubList',
  getGoodsListByCateId: LOCALURL + 'goods/getGoodsListByCateId'
}

export default {
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
  getGoodsListByCateId (params) {
    return request.post(URL.getGoodsListByCateId, params)
  }
}
