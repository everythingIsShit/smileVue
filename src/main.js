// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import './assets/css/common.scss'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

import
{
  Button,
  Row,
  Col,
  Swipe,
  SwipeItem,
  Field,
  NavBar,
  list,
  Toast,
  Tab,
  Tabs,
  pullRefresh,
  Tabbar,
  TabbarItem,
  Stepper,
  SubmitBar,
  Cell,
  CellGroup,
  ContactCard,
  ContactList,
  ContactEdit
} from 'vant'

Vue.use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem)
  .use(Field).use(NavBar).use(list).use(Toast).use(Tab).use(Tabs)
  .use(pullRefresh).use(Tabbar).use(TabbarItem).use(Stepper)
  .use(SubmitBar).use(Cell).use(CellGroup).use(ContactCard)
  .use(ContactList).use(ContactEdit)
Vue.use(VueAwesomeSwiper)
Vue.use(VueLazyLoad, {
  error: './assets/images/errorimg.png'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
