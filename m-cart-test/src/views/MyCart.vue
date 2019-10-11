<template>
  <div class="m-main">
    <div v-for="item in myCart" :key="item.spuId">
      {{item.spuName}},{{item.currentPrice}}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myCart: []
    }
  },
  mounted() {
    let myCart = JSON.parse(localStorage.getItem("myCart")) ? JSON.parse(localStorage.getItem("myCart")) : []
    this.myCart = myCart
  }
}
</script>

<style>

</style>