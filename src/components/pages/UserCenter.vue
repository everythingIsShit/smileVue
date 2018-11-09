<!--
* @author: leijx
* @date: 2018/11/05
* @module: 用户中心
-->
<template>
    <div class="user-center">
      <!--<van-nav-bar title="用户中心" fixed/>-->
      <header class="header">
        <van-row>
          <van-col span="8" class="avatar">
            <img src="../../assets/images/avatar.jpg" alt="头像">
          </van-col>
          <van-col span="14" class="username">刘桂林</van-col>
          <van-col span="2" class="more">
            <van-icon name="arrow"/>
          </van-col>
        </van-row>
      </header>
      <h2 class="van-doc-demo-block__title">送货地址</h2>
      <div class="van-cell van-cell--clickable van-address-item" @click="$router.push('/addressList')">
        <div class="van-cell__value van-cell__value--alone">
          <div class="van-radio">
            <span class="van-radio__label">
              <div class="van-address-item__name">张三，13000000000</div>
              <div class="van-address-item__address">浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室</div>
            </span>
          </div>
        </div>
        <van-icon name="arrow"/>
      </div>
    </div>
</template>

<script>
export default {
  name: 'UserCenter',
  components: {},
  created () {
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .header{
    padding: 1rem;
    line-height: 5rem;
    background: #e5017d;
    position: relative;
    .avatar{
      img{
        width: 5rem;
        height: 5rem;
        border-radius: 50%;
      }
    }
    .username {
      color: #fff;
      font-weight: bold;
      font-size: 1.2rem;
    }
    .more{
      color: #fff;
      font-weight: bold;
      text-align: right;
    }
  }
  .van-doc-demo-block__title {
    margin: 0;
    font-weight: 400;
    font-size: 14px;
    color: #383535;
    padding: 40px 15px 15px;
  }
  .van-address-item .van-radio__label{
    padding-left: 0;
  }
  .van-icon-arrow{
    position: absolute;
    top: 50%;
    right: 15px;
    font-size: 16px;
    transform: translate(0, -50%);
  }
  .user-center{
    background: #eee;
    height: 100%;
  }
</style>
