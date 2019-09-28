<template>
  <div>
    <button @click="handleSub">减</button>
    <button @click="handleAdd">加</button>
  </div>
</template>

<script>
export default {
  methods: {
    handleSub() {
      let count = this.$store.state.count;
      count--;
      this.$store.commit({ type: "setState", key: 'count', value: count });
    },
    handleAdd() {
      let count = this.$store.state.count;
      count++;
      this.$store.commit({ type: "setState", key: 'count', value: count });
    }
  }
};
</script>

<style>
</style>