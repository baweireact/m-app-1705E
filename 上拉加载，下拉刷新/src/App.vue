<template>
  <div>
    <scroller :on-refresh="refresh" :on-infinite="infinite">
      <div v-for="item in list" :key="item.id">
        <div class="m-list-item">{{item.name}}</div>
      </div>
    </scroller>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      list: [],
      page: 1
    };
  },
  methods: {
    refresh(done) {
      axios({
        url: "/api/mock_data?page=1&size=20"
      }).then(res => {
        setTimeout(() => {
          if (res.data.code === 200) {
            this.list = res.data.data;
            done();
          }
        }, 2000);
      });
    },
    infinite(done) {
      console.log(2);
      this.page = this.page + 1;
      axios({
        url: `/api/mock_data?page=${this.page}&size=20`
      }).then(res => {
        setTimeout(() => {
          if (res.data.code === 200) {
            this.list = this.list.concat(res.data.data);
            done();
            if (res.data.data.length < 20) {
              done(true);
            }
          }
        }, 2000);
      });
    }
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
