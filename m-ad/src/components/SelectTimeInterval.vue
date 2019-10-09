<template>
  <div>
    <div v-for="(item, index) in initData" :key="item.id">
      <el-checkbox
        :indeterminate="item.isIndeterminate"
        v-model="item.checked"
        @change="handleWeek(index, $event)"
      >{{item.week}}</el-checkbox>

      <span
        v-for="(hourItem,hourIndex) in item.hours"
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
  data() {
    return {
      initData: [
        {
          id: 0,
          week: "星期一",
          checked: true,
          isIndeterminate: false,
          hours: [
            {
              hour: 1,
              checked: true
            },
            {
              hour: 2,
              checked: true
            },
            {
              hour: 3,
              checked: true
            },
            {
              hour: 4,
              checked: true
            },
            {
              hour: 5,
              checked: true
            }
          ]
        },
        {
          id: 1,
          week: "星期二",
          checked: true,
          isIndeterminate: false,
          hours: [
            {
              hour: 1,
              checked: true
            },
            {
              hour: 2,
              checked: true
            },
            {
              hour: 3,
              checked: true
            },
            {
              hour: 4,
              checked: true
            },
            {
              hour: 5,
              checked: true
            }
          ]
        }
      ]
    };
  },
  methods: {
    handleHour(index, hourIndex) {
      this.initData[index].hours[hourIndex].checked = !this.initData[index]
        .hours[hourIndex].checked;

      let count = this.initData[index].hours.filter(
        item => item.checked === false
      ).length;
      if (this.initData[index].hours.length > count && count > 0) {
        this.initData[index].isIndeterminate = true;
      } else {
        this.initData[index].isIndeterminate = false;
      }

      if (this.initData[index].hours.length === count) {
        this.initData[index].checked = false;
      } else {
        this.initData[index].checked = true;
      }
    },
    handleWeek(index, checked) {
      this.initData[index].hours.forEach(item => {
        item.checked = checked;
      });

      let count = this.initData[index].hours.filter(
        item => item.checked === false
      ).length;
      if (this.initData[index].hours.length > count && count > 0) {
        this.initData[index].isIndeterminate = true;
      } else {
        this.initData[index].isIndeterminate = false;
      }
    }
  },
  updated() {}
};
</script>

<style>
</style>