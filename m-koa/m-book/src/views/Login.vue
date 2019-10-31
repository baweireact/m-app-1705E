<template>
  <div>
    <div>
      <input v-model="username" placeholder="请输入用户名" ref="username">
    </div>
    <div>
      <input v-model="password" placeholder="请输入密码" type="password" @keyup.enter="handleLogin()">
    </div>
    <button @click="handleLogin()">登录</button>
  </div>
</template>

<script>
import axios from 'axios'
import Api from '../api'

export default {
  data() {
    return {
      username: 'admin',
      password: '123456'
    }
  },
  methods: {
    handleLogin() {
      Api.login({username: this.username,password:this.password}).then(res => {
        if (res.code === 200) {
          localStorage.setItem('username', res.data.username)
          this.$router.push('/index/home')
        }
      })
    }
  },
  mounted() {
    this.$refs.username.focus()
  }
}
</script>

<style>

</style>