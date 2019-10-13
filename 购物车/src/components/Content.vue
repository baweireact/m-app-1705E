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
      item.checked = true
      item.count = 1
      let myCart = this.$store.state.myCart
      let index = myCart.findIndex(food => food.spuId === item.spuId)
      //去重，第一步先找购物车里有没有这个商品，第二步，分别处理两种情况，有count加1，没有直接添加
      if (index >= 0) {
        myCart[index].count = myCart[index].count + 1
      } else {
        myCart.push(item)
      }
      
      this.$store.commit({ type: 'setMyCart', myCart })
    }
  }
}
</script>

<style>

</style>