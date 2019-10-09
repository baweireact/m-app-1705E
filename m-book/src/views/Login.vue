<template>
  <div>
    <div>
      <input v-model="username" placeholder="用户名" />
    </div>
    <div>
      <input v-model="password" type="password" placeholder="密码" />
    </div>
    <button @click="handleLogin">登录</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username:'',
      password: ''
    }
  },
  methods: {
    handleLogin() {
      if (this.username === 'admin') {
        localStorage.setItem('username', this.username)
        this.$router.push('/index')
      } else {
        alert('登录失败')
      }
    }
  }
}
</script>

<style>

</style>