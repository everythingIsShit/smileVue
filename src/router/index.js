import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/ShoppingMall'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'
import Goods from '@/components/pages/Goods'
import CateList from '@/components/pages/CateList'
import ShoppingCar from '@/components/pages/ShoppingCar'
import Main from '@/components/pages/Main'
import UserCenter from '@/components/pages/UserCenter'
import Pay from '@/components/pages/Pay'
import AddressList from '@/components/pages/AddressList'

Vue.use(Router)

let router = new Router({
  routes: [
    {path: '/', redirect: '/main'},
    {path: '/register', name: 'Register', component: Register},
    {path: '/login', name: 'Login', component: Login},
    {path: '/goods/:goodsId', name: 'Goods', component: Goods, props: true, meta: {requireAuth: true}},
    {path: '/addressList', name: 'AddressList', component: AddressList, meta: {requireAuth: true}},
    {
      path: '/main',
      component: Main,
      children: [
        {path: '/', name: 'ShoppingMall', component: ShoppingMall, meta: {requireAuth: true}},
        {path: 'cateList', name: 'CateList', component: CateList, meta: {requireAuth: true}},
        {path: 'shoppingCar', name: 'shoppingCar', component: ShoppingCar, meta: {requireAuth: true}},
        {path: 'userCenter', name: 'UserCenter', component: UserCenter, meta: {requireAuth: true}},
        {path: 'pay', name: 'Pay', component: Pay, meta: {requireAuth: true}}
      ]
    }
  ]
})

// 注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  // 获取token
  let token = window.localStorage['token']
  // 判断要去的路由有没有requiresAuth
  if (to.meta.requireAuth) {
    if (token) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next() // 如果无需token,那么随它去吧
  }
})

export default router
