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
      this.$store.commit({ type: 'handleSub' })
    },
    handleAdd(){
      this.$store.commit({ type: 'handleAdd' })
    }
  },
  updated() {
    localStorage.setItem('count', this.count)
  },
  mounted() {
    let count = localStorage.getItem('count') ? localStorage.getItem('count') * 1 : 0
    this.$store.commit({type: 'setCount', count})
  }
}
</script>
