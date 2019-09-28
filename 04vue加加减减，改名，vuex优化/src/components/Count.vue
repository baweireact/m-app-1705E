<template>
  <div>
    {{count}}
  </div>
</template>

<script>
export default {
  computed: {
    count() {
      return this.$store.state.count
    }
  },
  updated() {
    let count = this.$store.state.count;
    localStorage.setItem("count", count);
  }
}
</script>

<style>

</style>