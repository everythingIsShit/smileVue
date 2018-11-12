<!--
* @author: leijx
* @date: 2018/10/24
* @module: 注册页
-->
<template>
  <div>
    <van-nav-bar
      title="用户注册"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    <div class="register-panel">
      <van-field
        v-model.trim="username"
        label="用户名"
        icon="clear"
        placeholder="请输入用户名"
        required
        @click-icon="username = ''"
      />
      <van-field
        v-model.trim="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
      <van-field
        v-model.trim="passwordAgain"
        type="password"
        label="密码"
        placeholder="请再次输入密码"
        required
      />
      <div class="register-button">
        <van-button
          type="primary"
          size="small"
          :loading="loading"
          @click="register"
          class="btn-item"
        >
          马上注册
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/api'
export default {
  name: 'Register',
  components: {},
  created () {
  },
  data () {
    return {
      username: '',
      password: '',
      passwordAgain: '',
      loading: false
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    // 表单校验
    checkForm () {
      if (!this.username || !this.password) {
        this.$toast.fail('用户名或密码不能为空')
        return false
      }
      if (this.username.length < 5) {
        this.$toast.fail('用户名不能少于5位')
        return false
      }
      if (this.password.length < 6) {
        this.$toast.fail('密码不能少于6位')
        return false
      }
      if (this.password !== this.passwordAgain) {
        this.$toast.fail('两次密码输入不一致')
        return false
      }
      return true
    },
    // 注册
    register () {
      if (!this.checkForm()) {
        return
      }
      const params = {
        username: this.username,
        password: this.password
      }
      this.loading = true
      api.registerUser(params).then(res => {
        localStorage.setItem('token', res.token)
        localStorage.setItem('username', res.data)
        this.$router.push('/main')
        this.$toast.success(res.message)
      }).finally(_ => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .register-panel{
    width:96%;
    border-radius: 5px;
    margin:20px auto;
    padding-bottom:50px;
  }
  .register-button{
    padding-top:10px;
    .btn-item{
      width: 100%;
    }
  }
</style>
