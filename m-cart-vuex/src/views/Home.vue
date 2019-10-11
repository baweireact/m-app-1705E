<template>
  <div class="m-main">
    <div class="m-index">
      <Sidebar></Sidebar>
      <Content></Content>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar'
import Content from '../components/Content'

export default {
  components: {
    Sidebar,
    Content
  },
  mounted() {
    this.$store.dispatch({ type: 'getData' })
  }
}
</script>
