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
  data() {
    return {
      count: ''
    }
  },
  components: {
    Count,
    Control
  },
  methods: {
    handleSub() {
      this.count--
    },
    handleAdd(){
      this.count++
    }
  },
  updated() {
    localStorage.setItem('count', this.count)
  },
  mounted() {
    let count = localStorage.getItem('count') ? localStorage.getItem('count') * 1 : 0
    this.count = count
  }
}
</script>
