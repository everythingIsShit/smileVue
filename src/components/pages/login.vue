<!--
* @author: leijx
* @date: 2018/10/25
* @module: 登录页
-->
<template>
  <div>
    <van-nav-bar
      title="用户登录"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    <div class="register-panel">
      <van-field
        v-model="username"
        label="用户名"
        icon="clear"
        placeholder="请输入用户名"
        required
        @click-icon="username = ''"
        :error-message="usernameErrorMsg"
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        :error-message="passwordErrorMsg"
        required
      />
      <div class="register-button">
        <van-button
          type="primary"
          @click="login"
          class="btn-item"
          :loading="loading"
          size="small"
        >
          登录
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
      usernameErrorMsg: '',
      passwordErrorMsg: '',
      loading: false
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    // 表单校验
    checkForm () {
      if (!this.username) {
        this.usernameErrorMsg = '用户名不能为空'
      } else if (this.username.length < 5) {
        this.usernameErrorMsg = '用户名不能少于5位'
      } else {
        this.usernameErrorMsg = ''
      }
      if (!this.password) {
        this.usernameErrorMsg = '面不能为空'
      } else if (this.password.length < 6) {
        this.passwordErrorMsg = '密码不能少于6位'
      } else {
        this.passwordErrorMsg = ''
      }
      return (!this.usernameErrorMsg && !this.passwordErrorMsg)
    },
    // 登录
    login () {
      if (!this.checkForm()) {
        return
      }
      const params = {
        username: this.username,
        password: this.password
      }
      this.loading = true
      api.login(params).then(res => {
        this.$toast.success(res.message)
        this.$router.push('/')
      }).catch(err => {
        this.$toast.fail(err)
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
