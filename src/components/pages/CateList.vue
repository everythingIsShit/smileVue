<!--
* @author: leijx
* @date: 2018/10/26
* @module: 分类列表
-->
<template>
    <div class="clearfix cate-list">
      <van-nav-bar title="类别列表" fixed/>
      <van-row>
        <van-col span="6" class="left-col">
          <div class="leftNav">
            <ul>
              <li v-for="(item,index) in cateList"
                  @click="clickCategory(item.ID)"
                  :class="{categoryActive:currentCate == item.ID}"
                  :key="index">
                {{item.MALL_CATEGORY_NAME}}
              </li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <div class="tabCategorySub">
            <van-tabs v-model="active" @change="cateSubChange">
              <van-tab
                v-for="(item, index) in categorySub"
                :key="index"
                :title="item.MALL_SUB_NAME">
              </van-tab>
            </van-tabs>
            <div class="list-div">
              <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                <van-list
                  :offset="100"
                  :immediate-check="false"
                  v-model="loading"
                  :finished="finished"
                  @load="onLoad"
                >
                  <div class="list-item" v-for="(item,index) in goodList" :key="index" @click="$router.push(`/goods/${item.ID}`)">
                    <div class="list-item-img"><img :src="item.IMAGE1" width="100%" :onerror="errorImg"/></div>
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
  data () {
    return {
      cateList: [], // 分类列表
      categorySub: [], // 子分类
      goodList: [], // 商品分类
      currentCate: 0, // 当前点击的分类ID
      active: '',
      categorySubId: '', // 当前小分类的id
      page: 1,
      isRefresh: false,
      errorImg: 'this.src="' + require('@/assets/images/errorimg.png') + '"', // 错误图片显示路径
      loading: false, // 是否处于加载状态，加载过程中不触发load事件
      finished: false // 是否已加载完成，加载完成后不再触发load事件
    }
  },
  created () {
  },
  methods: {
    // 获取大类列表
    getCateList () {
      Api.getCateList().then(res => {
        this.cateList = res.data
        let id = this.$route.query.cateId ? this.$route.query.cateId : this.cateList[0].ID
        this.clickCategory(id)
      })
    },
    // 点击大类的方法
    clickCategory (cateId) {
      this.page = 1
      this.currentCate = cateId
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
    // 子分类导航栏change事件
    cateSubChange (index) {
      this.page = 1
      this.categorySubId = this.categorySub[index].ID
      this.getGoodsList()
    },
    // 下拉刷新
    onRefresh () {
      this.page = 1
      this.finished = false
      this.getGoodsList()
    },
    // 获取商品列表
    getGoodsList (loadMore = false) {
      const params = {
        page: this.page,
        cateId: this.categorySubId
      }
      if (!loadMore) {
        this.goodList = []
      }
      Api.getGoodsListByCateId(params).then(res => {
        if (res.data.length === 0) {
          if (!loadMore) {
            this.$toast.fail('未查询到商品')
          } else {
            this.$toast.clear()
          }
          this.finished = true
          return
        }
        if (loadMore) {
          this.goodList.concat(res.data)
        } else {
          this.goodList = res.data
        }
      }).finally(_ => {
        this.isRefresh = false
        this.loading = false
      })
    },
    // 上拉加载更多
    onLoad () {
      this.page++
      this.getGoodsList(true)
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getCateList()
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.getCateList()
    next()
  }
}
</script>

<style lang="scss" scoped>
  .cate-list{
    height: 100%;
  }
  .left-col{
    border-right:1px solid #E4E7ED;
  }
  .leftNav ul li {
    line-height: 2rem;
    border-bottom:1px solid #E4E7ED;
    padding:3px;
    font-size:0.8rem;
    text-align: center;
  }
  .van-row {
    padding: 46px 0 50px 0;
    height: 100%;
    .van-col{
      height: 100%;
      overflow: auto;
    }
  }
  .van-nav-bar{
    z-index: 100 !important;
  }
  .categoryActive {
    color: #f00;
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
    height: calc(100% - 44px);
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
  .tabCategorySub{
    height: 100%;
  }
  /deep/ .van-tabs__wrap--scrollable .van-tab{
    flex: 0 0 30%;
  }
</style>
