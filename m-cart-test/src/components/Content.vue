<template>
  <div class="m-index-content">
    <div v-for="item in currentList" :key="item.spuId">
      {{item.spuName}},价格：{{item.currentPrice}}元
      <el-button @click="handleAdd(item)">加入购物车</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["currentList"],
  methods: {
    handleAdd(item) {
      console.log(item)
      let myCart = localStorage.getItem('myCart') ? JSON.parse(localStorage.getItem('myCart')) : []
      myCart.push(item)
      localStorage.setItem('myCart', JSON.stringify(myCart))
    }
  }
}
</script>

<style>

</style>