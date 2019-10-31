<template>
  <div>
    <span
      v-for="item in navList"
      :key="item.id"
      class="m-nav-item"
      :class="{active: currentId === item.id}"
      @click="handleNav(item.id)"
    >{{item.title}}</span>
  </div>
</template>

<script>
export default {
  computed: {
    navList() {
      return this.$store.state.navList;
    },
    currentId() {
      return this.$store.state.currentId;
    }
  },
  methods: {
    handleNav(id) {
      this.$store.commit({ type: 'setState', key: 'currentId', value: id })
      this.$store.dispatch({ type: 'getList', id })
    }
  }
};
</script>

<style>
</style>