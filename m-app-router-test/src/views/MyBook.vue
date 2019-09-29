<template>
  <div>
    <div v-for="item in bookList" :key="item.id">
      {{item.title}}
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      bookList: []
    }
  },
  mounted() {
    axios({
      url: '/api/get_my_book'
    }).then(res => {
      if (res.data.code === 200) {
        this.bookList = res.data.data
      }
    })
  }
}
</script>

<style>

</style>