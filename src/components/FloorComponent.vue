<!--
* @author: leijx
* @date: 2018/10/23
* @module: 楼层组件
-->
<template>
    <div>
      <!--标题-->
      <div class="floor-title">
        {{floorTitle}}
      </div>
      <!--floor one area-->
      <div class="floor">
        <div class="floor-anomaly">
          <div class="floor-one"><img :src="floor1[0].image" width="100%" /></div>
          <div>
            <div class="floor-two"><img :src="floor1[1].image" width="100%" /></div>
            <div><img :src="floor1[2].image" width="100%" /></div>
          </div>
        </div>
      </div>
      <!--规则-->
      <div class="floor-rule">
        <div v-for="(item ,index) in floor1.slice(3)" :key="index">
          <img :src="item.image" width="100%"/>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'FloorComponent',
  components: {},
  props: {
    floor1: {
      type: Array,
      default: function () {
        return []
      }
    },
    floorTitle: {
      type: String,
      default: ''
    }
  },
  created () {
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
  .floor-title{
    background: #EFEFEF;
    padding: .5rem 0;
    color: #DD3F14;
    text-align: center;
  }
  .floor-rule{
    display: flex;
    flex-direction: row;
    flex-wrap:wrap;
    background-color: #fff;
  }
  .floor-rule div{
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width:10rem;
    border-bottom:1px solid #ddd;
  }
  .floor-rule div:nth-child(odd){
    border-right: 1px solid #ddd;
  }
  .floor-anomaly{
    display: flex;
    flex-direction:row;
    background-color: #fff;
    border-bottom:1px solid #ddd;
  }
  .floor-anomaly div{
    width:10rem;
  }
  .floor-one{
    border-right:1px solid #ddd;
  }
  .floor-two{
    border-bottom:1px solid #ddd;
  }
</style>
