<!--
* @author: leijx
* @date: 2018/11/05
* @module: 用户中心
-->
<template>
    <div>
      <!--<van-nav-bar title="用户中心" fixed/>-->
      <header class="header">
        <van-row>
          <van-col span="8" class="avatar">
            <img src="../../assets/images/avatar.jpg" alt="头像">
          </van-col>
          <van-col span="14" class="username">刘桂林</van-col>
          <van-col span="2" class="more">&gt;</van-col>
        </van-row>
      </header>
      <h2 class="van-doc-demo-block__title">送货地址</h2>
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
</style>
