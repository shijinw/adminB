<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">欢迎使用优财后台管理系统</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'

export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo',
      'getRoutersConfig'
    ]),
    handleSubmit ({ userName, password }) {
      this.handleLogin({ userName, password }).then(res => {
        Promise.all([this.getRoutersConfig(), this.getUserInfo()]).then(res => {
          // 注册新路由配置
          this.$router.addRoutes(res[0])
          this.$router.push({
            name: 'home'
          })
        })
      })
    }
  },
  destroyed () {
    this.$router.go(0)
  }
}
</script>

<style>

</style>
