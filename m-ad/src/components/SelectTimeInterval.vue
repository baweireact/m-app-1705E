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
  model: {
    prop: "initData",
    event: "change"
  },
  props: ["initData"],
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

      this.$emit("change", this.initData);
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
      this.$emit("change", this.initData);
    },
    updateResult() {
      let dataClone = JSON.parse(JSON.stringify(this.initData));
      let result = dataClone.filter(week => week.checked);
      result.forEach(item => {
        item.hours = item.hours.filter(hour => hour.checked);
      });
      this.result = result;
    }
  }
};
</script>

<style>
</style>