<!--
* @author: leijx
* @date: 2018/11/08
* @module: 地址列表
-->
<template>
    <div>
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        :disabled-list="disabledList"
        disabled-text="以下地址超出配送范围"
        @add="onAdd"
        @edit="onEdit"
      />
      <transition name="bottom-in">
        <van-address-edit
          v-show="showAddressEdit"
          :area-list="areaList"
          show-postal
          show-delete
          show-set-default
          show-search-result
          :search-result="searchResult"
          @save="onSave"
          @delete="onDelete"
          @change-detail="onChangeDetail"
        />
      </transition>
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
      ],
      areaList: {},
      searchResult: []
    }
  },
  methods: {
    // 弹出新增地址编辑框
    onAdd () {
      this.showAddressEdit = true
    },
    onEdit (item, index) {
    },
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
  .van-address-edit {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: #fff;
  }
  .bottom-in-enter-active, .bottom-in-leave-active {
    top: 400px;
  }
  .bottom-in-enter, .bottom-in-leave-to{
    top: 0;
  }
</style>
