<template>
  <div class="home">
    <div v-for="item in list" :key="item.id" @click="handleDetail(item.id)">
      {{item.name}}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [{
        id: 0,
        name: '张三'
      }, {
        id: 1,
        name: '李四'
      }]
    }
  },
  methods: {
    handleDetail(id) {
      this.$router.push('/index/home/detail/' + id)
    }
  }
}
</script>
