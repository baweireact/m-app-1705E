<template>
  <div class="m-index-sidebar">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="m-sidebar-item"
      :class="{active: index === currentIndex}"
      @click="setIndex({index})"
    >{{item.categoryName}}</div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState(['list', 'currentIndex']),
  },
  methods: {
    ...mapMutations({
      setIndex: 'setIndex'
    })
  }
};
</script>

<style>
</style>