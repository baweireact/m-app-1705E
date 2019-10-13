<template>
  <div class="home">
    <div class="m-list-wrap">
      <div class="m-list" @scroll="handleScroll">
        <div v-for="(item,index) in carList" :key="index" :id="index" class="js-list-item">
          <div class="m-list-key">{{item.key}}</div>
          <div class="m-list-info">
            <div v-for="(car,index) in item.row" :key="index" class="m-car-item">
              <img :src="car.img" class="m-car-img" />
              <div class="m-car-name">{{car.name}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="m-sidebar">
        <div class="m-nav">
          <div
            v-for="(item,index) in carList"
            :key="index"
            class="m-nav-item"
            :class="{active: index === currentIndex}"
            @click="handleNav(index)"
          >{{item.key}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      carList: [],
      currentIndex: 0,
      listItemListTop: []
    };
  },
  methods: {
    handleNav(index) {
      document.getElementById(index).scrollIntoView(true);
      this.currentIndex = index;
    },
    handleScroll(e) {
      console.log(e.target.scrollHeight, e.target.scrollTop, e.target.clientHeight)
      let currentTop = e.target.scrollTop;
      for (let i = 0; i < this.listItemListTop.length; i++) {
        if (
          this.listItemListTop[i] <= currentTop &&
          currentTop < this.listItemListTop[i + 1]
        ) {
          this.currentIndex = i;
        }
      }
      //console.log(this.currentIndex)
    }
  },
  updated() {
    this.listItemListTop = [];
    if (this.listItemListTop.length === 0) {
      let listItemList = Array.from(
        document.getElementsByClassName("js-list-item")
      );
      listItemList.forEach(item => {
        this.listItemListTop.push(item.offsetTop);
      });
    }
  },
  mounted() {
    axios({
      url: "/api/car_list"
    }).then(res => {
      if (res.data.code === 200) {
        this.carList = res.data.data;
      }
    });
  }
};
</script>
