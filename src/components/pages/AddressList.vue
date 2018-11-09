<!--
* @author: leijx
* @date: 2018/11/08
* @module: 地址列表
-->
<template>
    <div class="address-list">
      <van-nav-bar
        title="地址列表"
        left-text="返回"
        left-arrow
        @click-left="$router.go(-1)"
      ></van-nav-bar>
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        :disabled-list="disabledList"
        disabled-text="以下地址超出配送范围"
        @add="$router.push('/addressEdit')"
        @edit="showAddressEdit = true"
      ></van-address-list>>
      <!--地址列表弹窗-->
      <van-popup v-model="showAddressEdit" position="right" :overlay="false" class="address-popup">

      </van-popup>
    </div>
</template>

<script>
export default {
  name: 'AddressList',
  components: {},
  created () {
  },
  data () {
    return {
      show: false,
      showAddressEdit: false,
      chosenAddressId: '1',
      list: [
        {
          id: '1',
          name: '张三',
          tel: '13000000000',
          address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
        },
        {
          id: '2',
          name: '李四',
          tel: '1310000000',
          address: '浙江省杭州市拱墅区莫干山路 50 号'
        }
      ],
      disabledList: [
        {
          id: '3',
          name: '王五',
          tel: '1320000000',
          address: '浙江省杭州市滨江区江南大道 15 号'
        }
      ]
    }
  },
  methods: {
    // 弹出新增地址编辑框
  }
}
</script>

<style lang="scss" scoped>
  .address-list{
    height: 100%;
  }
</style>
