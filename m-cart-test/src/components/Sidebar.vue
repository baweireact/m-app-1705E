<template>
  <div class="m-index-sidebar">
    <div
      v-for="(item, index) in list"
      :key="item.categoryName"
      class="m-sidebar-item"
      :class="{active: currentIndex === index}"
      @click="handleNav(index)"
    >{{item.categoryName}}</div>
  </div>
</template>

<script>
export default {
  props: ["list", "currentIndex", "onNav"],
  methods: {
    handleNav(index) {
      this.$emit('onNav', index)
    }
  }
};
</script>

<style>
</style>