<template>
  <div class="home">
    <Count :count="count"></Count>
    <Control :onAdd="handleAdd" :onSub="handleSub"></Control>
  </div>
</template>

<script>
import Count from '../components/Count'
import Control from '../components/Control'

export default {
  computed: {
    count() {
      return this.$store.state.count
    }
  },
  components: {
    Count,
    Control
  },
  methods: {
    handleSub() {
      let count = this.count - 1
      this.$store.dispatch({ type: 'updateCount', count })
    },
    handleAdd(){
      let count = this.count + 1
      this.$store.dispatch({ type: 'updateCount', count })
    }
  },
  mounted() {
    this.$store.dispatch({ type: 'getCount' })
  }
}
</script>
