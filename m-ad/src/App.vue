<template>
  <div id="app">
    <SelectTimeInterval v-model="initData"></SelectTimeInterval>
  </div>
</template>

<script>
import SelectTimeInterval from "./components/SelectTimeInterval";

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
  components: {
    SelectTimeInterval
  }
};
</script>
