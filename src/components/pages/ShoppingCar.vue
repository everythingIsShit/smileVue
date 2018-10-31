<!--
* @author: leijx
* @date: 2018/10/29
* @module: 购物车
-->
<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="购物车" />
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      cartInfo: [], // 购物车内的商品
      isEmpty: false // 购物车是否为空，不为空则显示true，为空显示false
    }
  }
}
</script>
<style scoped>
</style>
