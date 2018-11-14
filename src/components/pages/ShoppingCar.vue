<!--
* @author: leijx
* @date: 2018/10/29
* @module: 购物车
-->
<template>
  <div class="cart-wrapper">
    <div class="navbar-div">
      <van-nav-bar title="购物车" fixed/>
      <!--显示购物车中的商品-->
      <div class="cart-list">
        <div class="pang-row" v-for="(item,index) in cartInfo" :key="index">
          <div class="pang-img"><img :src="item.IMAGE1" width="100%" /></div>
          <div class="pang-text">
            <div class="pang-goods-name">{{item.NAME}}</div>
            <div class="pang-control">
              <van-stepper v-model="item.COUNT" />
            </div>
          </div>
          <div class="pang-goods-price">￥{{item.ORI_PRICE * item.COUNT | moneyFilter}}</div>
        </div>
      </div>
    </div>
    <!--清空购物车-->
    <!--<div class="card-title">-->
      <!--<van-button size="small" type="danger" @click="clearCart" plain>清空购物车</van-button>-->
    <!--</div>-->
    <van-submit-bar
      :loading="loading"
      :price="totalPrice"
      button-text="付款"
      @submit="onSubmit"
    />
  </div>
</template>
<script>
import Api from '@/api/api'
import { toMoney } from '@/utils/moneyFilter.js'
export default {
  data () {
    return {
      cartInfo: [], // 购物车内的商品
      loading: false,
      isEmpty: false // 购物车是否为空，不为空则显示true，为空显示false
    }
  },
  computed: {
    // 购物车商品总价
    totalPrice () {
      return this.cartInfo.reduce((a, b) => {
        return a + b.COUNT * b.ORI_PRICE
      }, 0) * 100
    }
  },
  filters: {
    moneyFilter (money) {
      return toMoney(money)
    }
  },
  created () {
    // this.getGoodsList()
  },
  methods: {
    // 获取商品列表
    getGoodsList () {
      Api.getGoodsByUseId().then(res => {
        this.cartInfo = res.data
      })
    },
    // 清空购物车的商品
    clearCart () {
    },
    // 总价结算
    onSubmit () {
      this.loading = true
      setTimeout(_ => {
        this.loading = false
        this.$toast.success('购买成功')
      }, 2000)
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例
      vm.getGoodsList()
    })
  }
}
</script>
<style scoped lang="scss">
  .cart-list{
    padding: 46px 0 100px 0;
    background-color: #fff;
  }
  .van-submit-bar {
    bottom: 50px;
  }
  .pang-row{
    display: flex;
    flex-direction: row;
    flex-wrap:nowrap;
    padding:0.5rem;
    font-size:0.85rem;
    border-bottom:1px solid #E4E7ED;
  }
  .pang-img{
    flex:6;
  }
  .pang-text{
    flex:14;
    padding-left:10px;
  }
  .pang-control{
    padding-top: 10px;
  }
  .pang-goods-name{
    font-size: 0.6rem;
  }
  .pang-goods-price{
    flex:4;
    text-align: right;
  }
</style>
