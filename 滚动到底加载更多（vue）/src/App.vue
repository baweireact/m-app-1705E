<template>
  <div>
    <div class="m-wrap" @scroll="handleScroll">
      <div v-for="item in list" :key="item.id" class="m-list-item">
        <img :src="item.image" class="m-list-item-img">
        <div class="m-list-item-info">{{item.name}}</div>
      </div>
      <div class="m-end">{{end}}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      list: [],
      page: 1,
      end: "",
      updateDone: false
    };
  },
  methods: {
    handleScroll(e) {
      // console.log(
      //   e.target.scrollHeight,
      //   e.target.clientHeight,
      //   e.target.scrollTop
      // );
      if (
        e.target.clientHeight + e.target.scrollTop + 200 >
          e.target.scrollHeight &&
        this.end === "" && this.updateDone
      ) {
        this.page = this.page + 1;
        this.updateDone = false
        axios({
          url: `/api/mock_data?page=${this.page}&size=20`
        }).then(res => {
          if (res.data.code === 200) {
            this.list = this.list.concat(res.data.data);
            if (res.data.data.length < 20) {
              console.log("到底了");
              this.end = "到底了";
            }
          }
        });
      }
    }
  },
  updated() {
    this.updateDone = true
  },
  mounted() {
    axios({
      url: "/api/mock_data?page=1&size=20"
    }).then(res => {
      if (res.data.code === 200) {
        this.list = res.data.data;
      }
    });
  }
};
</script>

<style>
</style>
