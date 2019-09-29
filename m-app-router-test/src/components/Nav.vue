<template>
  <div>
    <span
      v-for="(item, index) in navList"
      :key="item.id"
      class="m-nav-item"
      :class="{active: currentIndex === index}"
      @click="onNav(index, item.id)"
    >{{item.title}}</span>
  </div>
</template>

<script>
export default {
  props: ["navList", "currentIndex", "onNav"]
};
</script>

<style>
</style>