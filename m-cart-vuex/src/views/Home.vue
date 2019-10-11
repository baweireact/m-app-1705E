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
import { mapActions } from 'vuex'

export default {
  components: {
    Sidebar,
    Content
  },
  methods: {
    ...mapActions(['getData'])
  },
  mounted() {
    this.getData()
  }
}
</script>
