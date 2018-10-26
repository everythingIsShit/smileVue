import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/ShoppingMall'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'
import Goods from '@/components/pages/Goods'
import CateList from '@/components/pages/CateList'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'ShoppingMall', component: ShoppingMall},
    {path: '/register', name: 'Register', component: Register},
    {path: '/login', name: 'Login', component: Login},
    {path: '/goods/:goodsId', name: 'Goods', component: Goods, props: true},
    {path: '/cateList', name: 'CateList', component: CateList}
  ]
})
