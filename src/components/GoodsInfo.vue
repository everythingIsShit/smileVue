<!--
* @author: leijx
* @date: 2018/10/23
* @module: 商品列表
-->
<template>
  <div class="goods-info">
    <div class="goods-image">
      <img v-lazy="item.IMAGE1" width="90%" />
    </div>
    <div class="goods-name">{{item.NAME}}</div>
    <div class="goods-price">￥{{item.ORI_PRICE | moneyFilter }}</div>
  </div>
</template>
<script>
import { toMoney } from '@/utils/moneyFilter.js'
export default {
  props: {
    item: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  filters: {
    moneyFilter (money) {
      return toMoney(money)
    }
  },
  methods: {
  }
}
</script>
<style scoped>
  .goods-name{
    padding: 0 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
  }
</style>
