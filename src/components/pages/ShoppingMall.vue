<template>
  <div>
    <!--search bar layout-->
    <div class="search-bar">
        <van-row>
            <van-col span="3">
              <img src="../../assets/images/location.png" width="80%" class="location-icon" />
            </van-col>
            <van-col span="16">
              <input type="text" class="search-input"/>
            </van-col>
            <van-col span="5" class="search-btn">
              <van-button size="mini" type="primary">查找</van-button>
            </van-col>
        </van-row>
    </div>
    <!--swipwer area-->
    <div class="swiper-area">
      <van-swipe :autoplay="2000">
        <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
          <img v-lazy="banner.image" class="swipe-img"/>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="type-bar">
      <div  v-for="(cate,index) in category" :key="index" class="type-item">
        <img v-lazy="cate.image" width="90%" />
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>
    <!--Recommend goods area-->
    <div class="recommend-area">
      <div class="recommend-title">
        商品推荐
      </div>
      <div class="recommend-body">
        <!--swiper-->
        <swiper :options="swiperOption">
          <swiper-slide v-for=" (item ,index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img :src="item.image" width="80%" />
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price}} (￥{{item.mallPrice}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <floor-component :floor1="floor1" :floor-title="floorName.floor1"></floor-component>
    <floor-component :floor1="floor2" :floor-title="floorName.floor2"></floor-component>
    <floor-component :floor1="floor3" :floor-title="floorName.floor3"></floor-component>
    <!--Hot Area-->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <van-list>
          <van-row gutter="20">
            <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
              <goods-info :item="item" @click.native="goGoodsPage(item.goodsId)"></goods-info>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>
<script>
import FloorComponent from '../FloorComponent'
import GoodsInfo from '../GoodsInfo'
import { toMoney } from '@/utils/moneyFilter.js'
import api from '@/api/api'
export default {
  components: {
    FloorComponent,
    GoodsInfo
  },
  data () {
    return {
      bannerPicArray: [], // 轮播图片
      recommendGoods: [], // 推荐商品列表
      swiperOption: {
        autoplay: true,
        spaceBetween: 9,
        slidesPerView: 3,
        speed: 1000,
        loop: true
      },
      hotGoods: [], // 热卖商品
      floor1: [
        {
          image: ''
        },
        {
          image: ''
        },
        {
          image: ''
        }
      ], // 楼层1数据
      floor2: [], // 楼层2的数据
      floor3: [], // 楼层3的数据
      floorName: '', // 楼层标题
      category: [] // 商品种类列表
    }
  },
  filters: {
    moneyFilter (money) {
      return toMoney(money)
    }
  },
  created () {
    this.floor2 = this.floor3 = this.floor1
    this.$toast.loading({
      mask: true,
      duration: 0,
      message: '数据加载中...'
    })
    api.getGoodsInfo().then(data => {
      this.category = data.data.category
      this.bannerPicArray = data.data.slides
      this.recommendGoods = data.data.recommend
      this.floor1 = data.data.floor1
      this.floor2 = data.data.floor2
      this.floor3 = data.data.floor3
      this.floorName = data.data.floorName
      this.hotGoods = data.data.hotGoods
    }).finally(_ => {
      this.$toast.clear()
    })
  },
  methods: {
    // 去商品详情页
    goGoodsPage (goodsId) {
      this.$router.push(`/goods/${goodsId}`)
    }
  }
}
</script>
<style scoped lang="scss">
  .swipe-img{
    width: 100%;
    height: 167px;
  }
  .hot-area{
    text-align: center;
    font-size:14px;
    height: 1.8rem;
    line-height:1.8rem;
  }
  .recommend-body{
    border-bottom: 1px solid #eee;
  }
  .recommend-item{
    border-right: 1px solid #eee;
    font-size: 12px;
    text-align: center;
  }
  .recommend-area{
    background-color: #fff;
    margin-top: .3rem;
  }
  .recommend-title{
    border-bottom:1px solid #eee;
    font-size:14px;
    padding:.2rem;
    color:#e5017d;
  }
  .type-item{
    width: 20%;
    overflow: hidden;
  }
  .search-bar{
    height: 2.2rem;
    background-color: #e5017d;
    line-height:2.2rem;
  }
  .van-row {
    margin: 0 !important;
  }
  .search-input{
    width:100%;
    height: 1.8rem;
    border-top:0;
    border-left:0;
    border-right:0;
    border-bottom: 1px solid #eeeeee !important;
    background-color: #e5017d;
    color:#fff;
  }
  .location-icon{
    padding-top: .2rem;
    padding-left: .3rem;
  }
  .search-btn{
    text-align: center;
  }
  .swiper-area{
    clear:both;
    overflow: hidden;
  }
  .type-bar{
    background-color: #fff;
    margin:0 .3rem .3rem .3rem;
    border-radius: .3rem;
    font-size:14px;
    display: flex;
    flex-direction:row;
    flex-wrap:nowrap;
  }
  .type-bar div{
    padding: .3rem;
    font-size: 12px;
    text-align: center;
  }
</style>
