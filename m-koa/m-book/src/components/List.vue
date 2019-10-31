<template>
  <div>
    <div v-for="item in currentList" :key="item.id" class="m-list-item">
      <div class="m-list-item-img-wrap">
        <img v-lazy="item.avatar" alt="" class="m-list-item-img">
      </div>
      <div class="m-list-item-info">
        <div>{{item.title}}</div>
        <div>
          <button @click="handleDetail(item.id)">详情</button>
          <button v-if="item.is_in_my_book">已收藏</button>
          <button v-else @click="handleAdd(item)">收藏</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '../api'

export default {
  computed: {
    currentList() {
      return this.$store.state.currentList
    }
  },
  methods: {
    handleAdd(book) {
      Api.add({book}).then(res => {
        if (res.code === 200) {
          this.$store.dispatch({ type: 'getList' })
        }
      })
    },
    handleDetail(id) {
      this.$router.push(`/detail/${id}`)
    }
  }
}
</script>

<style>

</style>