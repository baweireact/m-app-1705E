<template>
  <div class="home">
    <div v-for="item in userList" :key="item.id">
      <span>用户名：{{item.username}}</span>
    </div>
  </div>
</template>

<script>
import Api from '../api'

export default {
  data() {
    return {
      userList: []
    }
  },
  mounted() {
    Api.getUser().then(res => {
      if (res.data.code === 200) {
        this.userList = res.data.data
      }
    })
  }
}
</script>
