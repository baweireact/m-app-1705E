<template>
  <div class="m-index-content">
    <div v-for="(item,index) in currentList" :key="index">
      <img :src="item.bigImageUrl" class="m-img"/>
      {{item.spuName}}
      <el-button @click="handleAdd(item)">加入购物车</el-button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentList() {
      return this.$store.state.currentList
    }
  },
  methods: {
    handleAdd(item) {
      //加入购物车之前，增加一个表示数量的字段
      item.count = 1
      let myCart = this.$store.state.myCart
      myCart.push(item)
      this.$store.commit({ type: 'setMyCart', myCart })
    }
  }
}
</script>

<style>

</style>