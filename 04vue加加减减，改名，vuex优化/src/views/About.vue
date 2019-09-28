<template>
  <div class="about">
    {{count}}
  </div>
</template>

<script>
export default {
  computed: {
    count() {
      return this.$store.state.count
    }
  }
}
</script>
