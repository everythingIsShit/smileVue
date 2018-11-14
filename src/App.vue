<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      transitionName: ''
    }
  },
  watch: {
    $route (to, from) {
      // 如果是从用户中心进入地址列表的话，则为前进状态
      if (from.name === 'UserCenter' && to.name === 'AddressList') {
        this.transitionName = 'slide-left'
      } else if (from.name === 'AddressList' && to.name === 'UserCenter') {
        this.transitionName = 'slide-right'
      } else if (from.name === 'AddressList' && to.name === 'AddressEdit') {
        this.transitionName = 'slide-left'
      } else if (from.name === 'AddressEdit' && to.name === 'AddressList') {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-bottom-leave-active,
.slide-bottom-leave-active,
.slide-top-leave-active,
.slide-top-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
  width: 100%;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-top-enter {
  transform: translate(0, -100%);
}
.slide-top-leave-active {
  transform: translate(0, 100%);
}
.slide-top-enter {
  opacity: 0;
  transform: translate(0, -100%);
}
.slide-top-leave-active {
  opacity: 0;
  transform: translate(0, 100%);
}
</style>
