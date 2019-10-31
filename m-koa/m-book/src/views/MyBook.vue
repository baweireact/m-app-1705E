<template>
  <div>
    <div v-for="item in myBook" :key="item.id">
      {{item.title}}
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    myBook() {
      return this.$store.state.myBook
    }
  },
  mounted() {
    this.$store.dispatch({ type: 'getMyBook' })
  }
}
</script>

<style>

</style>