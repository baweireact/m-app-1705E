<template>
  <div>
    <button @click="onSub">减</button>
    <button @click="onAdd">加</button>
  </div>
</template>

<script>
export default {
  props: ['onAdd', 'onSub']
}
</script>

<style>

</style>