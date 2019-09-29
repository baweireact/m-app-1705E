<template>
  <div class="m-login-wrap">
    <div class="m-login">
      <div>
        <input v-model="username" placeholder="请输入用户名"/>
      </div>
      <div>
        <input v-model="password" placeholder="请输入密码"/>
      </div>
      <div>
        <button @click="handleLogin">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    handleLogin() {
      this.$router.push('/index/home')
    }
  }
}
</script>

<style>

</style>