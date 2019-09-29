<template>
  <div>
    <div v-for="item in bookList" :key="item.id">
      {{item.title}}<button v-if="!item.is_in_my_book" @click="handleAdd(item)">收藏</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['bookList', 'updateList'],
  methods: {
    handleAdd(item) {
      axios({
        url: '/api/add_book',
        data: {
          item
        },
        method: 'post'
      }).then(res=> {
        if(res.data.code === 200) {
          this.$emit('updateList')
        }
      })
    }
  }
}
</script>

<style>

</style>