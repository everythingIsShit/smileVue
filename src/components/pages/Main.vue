<!--
* @author: leijx
* @date: 2018/10/31
* @module: 底部导航栏
-->
<template>
    <div class="main">
      <div class="main-div">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </div>
      <van-tabbar v-model="active">
        <van-tabbar-item
          v-for="(item, index) in tabBarList"
          :key="index"
          :icon="item.icon"
          :to="item.path"
        >
          {{item.title}}
        </van-tabbar-item>
      </van-tabbar>
    </div>
</template>

<script>
export default {
  name: 'Main',
  components: {},
  created () {
  },
  data () {
    return {
      tabBarList: [
        {title: '首页', path: '/main', icon: 'shop'},
        {title: '商品列表', path: '/main/cateList', icon: 'records'},
        {title: '购物车', path: '/main/shoppingCar', icon: 'cart'},
        {title: '我的', path: '/main/userCenter', icon: 'contact'}
      ],
      active: 0
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.main{
  height: 100%;
}
.main-div{
  height: calc(100% - 50px);
  overflow: auto;
}
</style>
