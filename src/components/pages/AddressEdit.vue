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
export default {
  name: 'AddressEdit',
  components: {},
  created () {
  },
  data () {
    return {
      areaList,
      searchResult: []
    }
  },
  methods: {
    onSave () {
    },
    onDelete () {
    },
    onChangeDetail (val) {
      if (val) {
      } else {
        this.searchResult = []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.address-edit{
  height: 100%;
  background: #fff;
}
</style>
