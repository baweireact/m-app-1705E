<template>
  <div>
    <div>
      <input v-model="username" placeholder="请输入用户名" ref="username"/>
    </div>
    <div>
      <input v-model="password" type="password" placeholder="请输入密码" @keyup.enter="handleLogin"/>
    </div>
    <div>
      <button @click="handleLogin">登录</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    handleLogin() {
      axios({
        url: '/api/login',
        data: {
          username: this.username,
          password: this.password
        },
        method: 'post'
      }).then(res => {
        if (res.data.code === 200) {
          localStorage.setItem('token', res.data.data.token)
          this.$router.push('/home')
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