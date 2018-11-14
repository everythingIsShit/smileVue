<!--
* @author: leijx
* @date: 2018/11/05
* @module: 付款结算
-->
<template>
    <div>
      <van-nav-bar
        title="确认订单"
        left-text="返回"
        left-arrow
        fixed
        @click-left="$router.go(-1)"
      ></van-nav-bar>
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
    </div>
</template>

<script>
export default {
  name: 'Pay',
  components: {},
  created () {
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>

</style>
