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
        @select="addressChange"
        @add="add"
        @edit="edit"
      ></van-address-list>
    </div>
</template>

<script>
import Api from '@/api/api'
export default {
  name: 'AddressList',
  components: {},
  created () {
  },
  data () {
    return {
      show: false,
      chosenAddressId: '',
      list: [], // 地址列表
      disabledList: []
    }
  },
  methods: {
    getAddressList () {
      Api.getAddressList().then(res => {
        res.data.forEach(item => {
          const obj = {
            id: item._id,
            name: item.contacts,
            tel: item.telephone,
            address: item.address,
            areaCode: item.areaCode,
            addressDetail: item.addressDetail,
            isDefault: item.defaultAddress
          }
          if (item.defaultAddress) {
            this.chosenAddressId = item._id
          }
          this.list.push(obj)
        })
      })
    },
    // 地址编辑
    edit (item) {
      if (localStorage) {
        localStorage.setItem('selectedAddress', JSON.stringify(item))
        this.$router.push('/addressEdit')
      } else {
        this.$toast.fail('对不起您的浏览器版本太低')
      }
    },
    // 添加新地址
    add () {
      if (localStorage) {
        localStorage.removeItem('selectedAddress')
        this.$router.push('/addressEdit')
      } else {
        this.$toast.fail('对不起您的浏览器版本太低')
      }
    },
    // 设置默认地址
    addressChange (item) {
      console.log(item)
      const params = {
        addressId: item.id
      }
      Api.setDefaultAddress(params).then(res => {
        console.log(res)
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
  .address-list{
    height: 100%;
  }
</style>
