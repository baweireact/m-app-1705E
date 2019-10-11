<template>
  <div class="m-main">
    <div class="m-index">
      <Sidebar :list="list" :currentIndex="currentIndex" @onNav="handleNav"></Sidebar>
      <Content :currentList="currentList"></Content>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import Content from '../components/Content'

export default {
  data() {
    return {
      currentIndex: 0,
      list: [],
      currentList: []
    }
  },
  components: {
    Sidebar,
    Content
  },
  methods: {
    handleNav(index) {
      this.currentIndex = index
      this.currentList = this.list[index].spuList
    }
  },
  mounted() {
    axios({
      url: '/api/list'
    }).then(res => {
      if (res.data.code === 200) {
        this.list = res.data.data
        //this.currentList = this.list[0].spuList
        this.handleNav(0)
      }
    })
  }
}
</script>
