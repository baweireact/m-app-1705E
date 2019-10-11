<template>
  <div class="m-index-content">
    <div v-for="(item,index) in currentList" :key="index">
      <img :src="item.bigImageUrl" class="m-img"/>
      {{item.spuName}}
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentList() {
      return this.$store.state.currentList
    }
  }
}
</script>

<style>

</style>