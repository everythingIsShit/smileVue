<!--
* @author: leijx
* @date: 2018/10/25
* @module: 商品详情页
-->
<template>
    <div>
      <div class="navbar-div">
        <van-nav-bar
          title="商品详情"
          left-text="返回"
          left-arrow
          @click-left="$router.go(-1)"
        />
      </div>
      <div class="topimage-div">
        <img :src="goodsInfo.IMAGE1" width="100%" :onerror="errorImg"/>
      </div>
      <div class="goods-price">￥{{goodsInfo.PRESENT_PRICE}}</div>
      <div class="goods-name">{{goodsInfo.NAME}}</div>
      <div class="goods-tabs">
        <van-tabs swipeable sticky>
          <van-tab title="商品详情">
            <div class="detail" v-html="goodsInfo.DETAIL">
            </div>
          </van-tab>
          <van-tab title="评价">
            正在制作中
          </van-tab>
        </van-tabs>
      </div>
      <!--底部按钮-->
      <div class="goods-bottom">
        <div>
          <van-button size="large" type="primary" @click="addToCart">加入购物车</van-button>
        </div>
        <div>
          <van-button size="large" type="danger" @click="purchase">直接购买</van-button>
        </div>
      </div>
    </div>
</template>

<script>
import Api from '@/api/api'
import { toMoney } from '@/utils/moneyFilter.js'
export default {
  name: 'Goods',
  components: {},
  props: {
    goodsId: {
      type: String,
      default: ''
    }
  },
  watch: {
    goodsId () {
      this.getGoodsInfo()
    }
  },
  created () {
    this.getGoodsInfo()
  },
  data () {
    return {
      errorImg: 'this.src="' + require('@/assets/images/errorimg.png') + '"', // 错误图片显示路径
      goodsInfo: {} // 商品详细数据
    }
  },
  methods: {
    // 获取商品详情
    getGoodsInfo () {
      const params = {
        goodsId: this.goodsId
      }
      this.$toast.loading({
        mask: true,
        duration: 0,
        message: '商品加载中...'
      })
      Api.getDetailGoodsInfo(params).then(res => {
        this.goodsInfo = res.data
      }).finally(_ => {
        this.$toast.clear()
      })
    },
    // 添加至购物车
    addToCart () {
      const params = {
        goodsId: this.goodsId
      }
      Api.addToCart(params).then(res => {
        this.$toast.success(res.message)
      })
    },
    purchase () {
      this.$toast.success('购买成功')
    }
  },
  filters: {
    moneyFilter (money) {
      return toMoney(money)
    }
  }
}
</script>

<style lang="scss" scoped>
  .detail{
    font-size:0;
  }
  .goods-name{
    background-color: #fff;
    text-align: center;
  }
  .goods-price{
    background-color: #fff;
    padding: 0 .5rem;
    text-align: center;
    color: #f00;
    font-weight: bold;
  }
  .goods-bottom{
    position: fixed;
    bottom:0;
    z-index: 100;
    left:0;
    background-color: #FFF;
    width:100%;
    display: flex;
    flex-direction: row;
    flex-flow: nowrap;
  }
  .goods-bottom > div{
    flex:1;
    padding:5px;
  }
  .goods-tabs{
    margin-bottom: 60px;
  }
</style>
