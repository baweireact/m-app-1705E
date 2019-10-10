<template>
  <div>
    <div v-for="(item, index) in initData" :key="index">
      <el-checkbox v-model="item.checked" :indeterminate="item.isIndeterminate" @change="handleWeek(index, $event)">{{item.week}}</el-checkbox>
      <span
        v-for="(hourItem, hourIndex) in item.hours"
        :key="hourIndex"
        class="m-hour"
        :class="{active: hourItem.checked}"
        @click="handleHour(index, hourIndex)"
      >{{hourItem.hour}}</span>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: "initData"
  },
  props: ["initData"],
  methods: {
    handleHour(index, hourIndex) {
      this.initData[index].hours[hourIndex].checked = !this.initData[index].hours[hourIndex].checked

      console.log(this.initData[index].hours.length)
      console.log(this.initData[index].hours.filter(item => {
        return !item.checked
      }).length)

      //hour等false的数量
      let count = this.initData[index].hours.filter(item => {
        return !item.checked
      }).length

      if (this.initData[index].hours.length === count) {
        this.initData[index].checked = false
      } else {
        this.initData[index].checked = true
      }

      //控制半选状态
      if (count > 0 && count < this.initData[index].hours.length) {
        this.initData[index].isIndeterminate = true
      } else {
        this.initData[index].isIndeterminate = false
      }
    },
    handleWeek(index, checked) {
      this.initData[index].hours.forEach(item => {
        item.checked = checked
      })
    }
  }
};
</script>

<style>
</style>