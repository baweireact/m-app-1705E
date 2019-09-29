<template>
  <div class="home">
    <Nav :navList="navList" :currentIndex="currentIndex" :onNav="handleNav"></Nav>
    <BookList :bookList="bookList" @updateList="updateList"></BookList>
  </div>
</template>

<script>
import axios from "axios";
import Nav from "../components/Nav";
import BookList from "../components/BookList";

export default {
  data() {
    return {
      currentIndex: 0,
      navList: [],
      bookList: []
    };
  },
  components: {
    Nav,
    BookList
  },
  methods: {
    handleNav(index, id) {
      this.currentIndex = index;
      axios({
        url: `/api/get_list?id=${id}`
      }).then(res => {
        if (res.data.code === 200) {
          this.bookList = res.data.data;
        }
      });
      localStorage.setItem("id", id);
      localStorage.setItem("index", index);
    },
    updateList() {
      let id = localStorage.getItem('id')
      axios({
        url: `/api/get_list?id=${id}`
      }).then(res => {
        if (res.data.code === 200) {
          this.bookList = res.data.data;
        }
      });
    }
  },
  mounted() {
    let id = localStorage.getItem("id") ? localStorage.getItem("id") : 0;
    let index = localStorage.getItem("index")
      ? localStorage.getItem("index") * 1
      : 0;
    this.currentIndex = index;
    //导航
    axios({
      url: "/api/get_nav"
    }).then(res => {
      if (res.data.code === 200) {
        this.navList = res.data.data;
      }
    });
    //图书列表
    axios({
      url: `/api/get_list?id=${id}`
    }).then(res => {
      if (res.data.code === 200) {
        this.bookList = res.data.data;
      }
    });
  }
};
</script>
