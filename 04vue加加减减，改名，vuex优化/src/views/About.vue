<template>
  <div class="about">{{count}}
    <div></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        a: 0
      }
    },
    methods: {
      a() {
        localStorage.getItem('a')
        let arr = []
      }
    },
    computed: {
      count() {
        return this.$store.state.count;
      }
    },
    mounted
  };
</script>