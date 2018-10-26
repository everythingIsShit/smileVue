<!--
* @author: leijx
* @date: 2018/10/26
* @module: 分类列表
-->
<template>
    <div>
      <div class="navbar-div">
        <van-nav-bar title="类别列表" />
      </div>
      <van-row>
        <van-col span="6">
          <div class="leftNav">
            <ul>
              <li v-for="(item,index) in cateList"
                  @click="clickCategory(index, item.ID)"
                  :class="{categoryActive:categoryIndex == index}"
                  :key="index">
                {{item.MALL_CATEGORY_NAME}}
              </li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <div class="tabCategorySub">
            <van-tabs v-model="active">
              <van-tab
                v-for="(item, index) in categorySub"
                :key="index"
                @change="_ => {cateSubClick(item.ID)}"
                :title="item.MALL_SUB_NAME">
              </van-tab>
            </van-tabs>
            <div class="list-div">
              <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                <van-list
                  v-model="loading"
                  :finished="finished"
                  @load="onLoad"
                >
                  <div class="list-item" v-for="(item,index) in goodList" :key="index">
                    <div class="list-item-img"><img :src="item.IMAGE1" width="100%"/></div>
                    <div class="list-item-text">
                      <div>{{item.NAME}}</div>
                      <div class="">￥{{item.ORI_PRICE}}</div>
                    </div>
                  </div>
              </van-list>
              </van-pull-refresh>
            </div>
          </div>
        </van-col>
      </van-row>
    </div>
</template>

<script>
import Api from '@/api/api'
export default {
  name: 'CateList',
  components: {},
  created () {
    Api.getCateList().then(res => {
      this.cateList = res.data
      this.clickCategory(0, this.cateList[0].ID)
    })
  },
  data () {
    return {
      cateList: [], // 分类列表
      categorySub: [], // 子分类
      goodList: [], // 商品分类
      categoryIndex: 0,
      active: '',
      categorySubId: '', // 当前小分类的id
      page: 1,
      isRefresh: false,
      loading: false, // 是否处于加载状态，加载过程中不触发load事件
      finished: false // 是否已加载完成，加载完成后不再触发load事件
    }
  },
  methods: {
    // 点击大类的方法
    clickCategory (index, cateId) {
      this.page = 1
      this.categoryIndex = index
      this.getCateSub(cateId)
    },
    // 获取小类
    getCateSub (cateId) {
      const params = {
        cateId: cateId
      }
      Api.getCateSubList(params).then(res => {
        this.page = 1
        this.categorySub = res.data
        this.categorySubId = this.categorySub[0].ID
        this.getGoodsList()
      })
    },
    cateSubClick (categorySubId) {
      this.categorySubId = categorySubId
      this.getGoodsList()
    },
    onRefresh () {},
    // 获取商品列表
    getGoodsList () {
      const params = {
        page: this.page,
        categorySubId: this.categorySubId
      }
      Api.getGoodsListByCateId(params).then(res => {
        this.page++
        this.goodList = res.data
      })
    },
    onLoad () {
      // 异步更新数据
      setTimeout(_ => {
        this.getGoodsList()
      }, 2000)
    }
  }
}
</script>

<style lang="scss" scoped>
  .leftNav ul li {
    line-height: 2rem;
    border-bottom:1px solid #E4E7ED;
    padding:3px;
    font-size:0.8rem;
    text-align: center;
  }
  .categoryActive {
    background-color: #fff;
  }
  .list-item{
    text-align: center;
    line-height: 80px;
    border-bottom: 1px solid #f0f0f0;
    background-color: #fff;
  }
  .list-div{
    overflow: scroll;
  }
  .list-item{
    display: flex;
    flex-direction: row;
    font-size:0.8rem;
    border-bottom: 1px solid #f0f0f0;
    background-color: #fff;
    padding:5px;
  }
  .list-div{
    overflow: scroll;
  }
  .list-item-img{
    flex:8;
  }
  .list-item-text{
    flex:16;
    margin-top:10px;
    margin-left:10px;
  }
</style>
