<template>
  <div>
    <img :src="detail.avatar" alt />
    <div>
      <button v-if="detail.is_in_my_book">已收藏</button>
      <button v-else @click="handleAdd(detail)">收藏</button>
    </div>
    <div>
      {{detail.summary}}
    </div>
  </div>
</template>

<script>
import Api from "../api";

export default {
  data() {
    return {
      detail: {}
    };
  },
  methods: {
    handleAdd(book) {
      Api.add({ book }).then(res => {
        if (res.code === 200) {
          this.detail.is_in_my_book = true
        }
      })
    }
  },
  mounted() {
    let { id } = this.$route.params;
    Api.getDetail(`?id=${id}`).then(res => {
      if (res.code === 200) {
        this.detail = res.data;
      }
    });
  }
};
</script>

<style>
</style>