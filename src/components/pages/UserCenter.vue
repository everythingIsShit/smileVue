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
          <van-col span="14" class="username">{{username}}</van-col>
          <van-col span="2" class="more">
            <van-icon name="arrow"/>
          </van-col>
        </van-row>
      </header>
      <template v-if="address">
        <h2 class="van-doc-demo-block__title">送货地址</h2>
        <div class="van-cell van-cell--clickable van-address-item" @click="$router.push('/addressList')">
          <div class="van-cell__value van-cell__value--alone">
            <div class="van-radio">
            <span class="van-radio__label">
              <div class="van-address-item__name">{{`${address.contacts}，${address.telephone}`}}</div>
              <div class="van-address-item__address">{{address.address + address.addressDetail}}</div>
            </span>
            </div>
          </div>
          <van-icon name="arrow"/>
        </div>
      </template>
      <template v-else>
        <p class="tip">暂无默认收获地址</p>
        <van-button
          type="primary"
          @click="$router.push('/addressList')"
          class="btn-item"
          size="small"
        >
          设置默认收获地址
        </van-button>
      </template>
    </div>
</template>

<script>
import Api from '@/api/api'
export default {
  name: 'UserCenter',
  components: {},
  created () {
    this.getAddressList()
    this.username = localStorage.getItem('username')
  },
  data () {
    return {
      address: null
    }
  },
  methods: {
    getAddressList () {
      Api.getAddressList().then(res => {
        this.address = res.data.find(address => address.defaultAddress)
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getAddressList()
    })
  }
}
</script>

<style lang="scss" scoped>
  .btn-item{
    width: 90%;
    display: block;
    margin: 10px auto 0;
  }
  .tip{
    text-align: center;
    font-size: 14px;
    padding-top: 2rem;
    color: #aaa;
  }
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
