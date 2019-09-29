<template>
  <div>
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
      localStorage.setItem('username', 'admin')
      this.$router.push('/index/home')
    }
  }
}
</script>

<style>

</style>