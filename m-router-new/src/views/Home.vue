<template>
  <ul class="home">
    <li v-for="item in list" :key="item.id">
      <div>{{item.title}}</div>
    </li>
  </ul>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'home',
  data() {
    return {
      list: [{
        id: 0,
        title: 'a'
      }, {
        id: 1,
        title: 'b'
      }]
    }
  },
  methods: {
    handleAdd() {
      
    }
  }
}
</script>
