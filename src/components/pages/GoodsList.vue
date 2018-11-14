<!--
* @author: leijx
* @date: 2018/08/06
* @module: 企业搜索
* @explain:主页
-->
<template>
  <div class="list-div">
    <van-search
      v-if="showSearchBar"
      v-model.trim="searchValue"
      placeholder="请输入搜索关键词"
      show-action
      background="#e5017d"
      @search="getGoodsList"
    >
      <div slot="action" @click="getGoodsList" class="search-txt">搜索</div>
    </van-search>
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
</template>

<script>
import Api from '@/api/api'
export default {
  props: {
    categorySubId: {
      type: String,
      default: ''
    },
    searchTxt: {
      type: String,
      default: ''
    },
    showSearchBar: {
      type: Boolean,
      default: true
    }
  },
  name: 'GoodsList',
  components: {},
  created () {
    if (this.searchTxt) {
      this.searchValue = this.searchTxt
      this.page = 1
      this.getGoodsList()
    }
  },
  watch: {
    categorySubId () {
      this.page = 1
      this.getGoodsList()
    },
    searchTxt (val) {
      this.searchValue = val
      this.page = 1
      this.getGoodsList()
    }
  },
  data () {
    return {
      searchValue: '',
      page: 1,
      isRefresh: false,
      goodList: [], // 商品分类
      errorImg: 'this.src="' + require('@/assets/images/errorimg.png') + '"', // 错误图片显示路径
      loading: false, // 是否处于加载状态，加载过程中不触发load事件
      finished: false // 是否已加载完成，加载完成后不再触发load事件
    }
  },
  methods: {
    // 下拉刷新
    onRefresh () {
      this.page = 1
      this.finished = false
      this.getGoodsList()
    },
    // 上拉加载更多
    onLoad () {
      this.page++
      this.getGoodsList(true)
    },
    // 获取商品列表
    getGoodsList (loadMore = false) {
      const params = {
        page: this.page,
        cateId: this.categorySubId,
        content: this.searchValue
      }
      if (!loadMore) {
        this.goodList = []
      }
      Api.getGoodsList(params).then(res => {
        if (res.data.length === 0) {
          if (!loadMore) {
            this.$toast.fail('未查询到商品')
          } else {
            this.$toast.fail('没有更多了')
          }
          this.finished = true
          return
        }
        if (loadMore) {
          this.goodList = this.goodList.concat(res.data)
        } else {
          this.goodList = res.data
        }
      }).finally(_ => {
        this.isRefresh = false
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .list-div{
    overflow: scroll;
  }
  .search-txt{
    color: #ffffff;
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
