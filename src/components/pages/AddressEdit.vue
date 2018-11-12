<!--
* @author: leijx
* @date: 2018/11/09
* @module: 地址编辑页
-->
<template>
    <div class="address-edit">
      <van-nav-bar
        title="添加地址"
        left-text="返回"
        left-arrow
        @click-left="$router.go(-1)"
      ></van-nav-bar>
      <van-address-edit
        class="address-edit"
        :area-list="areaList"
        :address-info="addressInfo"
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
      ></van-address-edit>
    </div>
</template>

<script>
import areaList from 'vant/packages/area/demo/area'
import Api from '@/api/api'
export default {
  name: 'AddressEdit',
  components: {},
  created () {
  },
  data () {
    return {
      areaList,
      addressInfo: {},
      searchResult: []
    }
  },
  methods: {
    // 保存
    onSave (content) {
      console.log(content)
      let params = {
        telephone: content.tel,
        contacts: content.name,
        address: content.province + content.city + content.county,
        addressDetail: content.addressDetail,
        areaCode: content.areaCode,
        defaultAddress: content.isDefault
      }
      let methodFun
      if (content.id) {
        methodFun = Api.editAddress
        params._id = content.id
      } else {
        methodFun = Api.addAddress
      }
      methodFun(params).then(_ => {
        let msg = content.id ? '地址修改成功' : '地址添加成功'
        this.$toast.success(msg)
        this.$router.go(-1)
      })
    },
    onDelete () {
    },
    onChangeDetail (val) {
      if (val) {
      } else {
        this.searchResult = []
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (localStorage) {
        const addressInfo = localStorage.getItem('selectedAddress')
        vm.addressInfo = addressInfo ? JSON.parse(addressInfo) : {}
        console.log(vm.addressInfo)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.address-edit{
  height: 100%;
  background: #fff;
}
</style>
