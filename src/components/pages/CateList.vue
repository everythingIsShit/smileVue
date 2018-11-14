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
            <goods-list :category-sub-id="categorySubId" :show-search-bar="false"></goods-list>
          </div>
        </van-col>
      </van-row>
    </div>
</template>

<script>
import Api from '@/api/api'
import GoodsList from './GoodsList'
export default {
  name: 'CateList',
  components: {
    GoodsList
  },
  data () {
    return {
      cateList: [], // 分类列表
      categorySub: [], // 子分类
      currentCate: 0, // 当前点击的分类ID
      active: '',
      categorySubId: '', // 当前小分类的id
      page: 1
    }
  },
  created () {
    this.getCateList()
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
      this.currentCate = cateId
      this.getCateSub(cateId)
    },
    // 获取小类
    getCateSub (cateId) {
      const params = {
        cateId
      }
      Api.getCateSubList(params).then(res => {
        this.categorySub = res.data
        // 默认点击第一个子分类
        this.cateSubChange(0)
      })
    },
    // 子分类导航栏change事件
    cateSubChange (index) {
      this.categorySubId = this.categorySub[index].ID
    }
  },
  beforeRouteEnter (to, from, next) {
    next()
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
    padding-top: 46px;
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
</style>
