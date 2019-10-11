<template>
  <div class="m-index-sidebar">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="m-sidebar-item"
      :class="{active: index === currentIndex}"
      @click="handleNav(index)"
    >{{item.categoryName}}</div>
  </div>
</template>

<script>
export default {
  computed: {
    list() {
      return this.$store.state.list;
    },
    currentIndex() {
      return this.$store.state.currentIndex;
    }
  },
  methods: {
    handleNav(index) {
      this.$store.commit({ type: 'setIndex', index })
    }
  }
};
</script>

<style>
</style>