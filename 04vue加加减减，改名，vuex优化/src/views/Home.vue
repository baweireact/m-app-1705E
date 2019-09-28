<template>
  <div class="home">
    <Count></Count>
    <Control></Control>
    <div>
      {{gameName}}
      <div>
        <button @click="handleUpdateGameName">改名</button>
        <button @click="handleUpdateGameNameBack">改回来</button>
      </div>
    </div>
  </div>
</template>

<script>
import Count from "../components/Count";
import Control from "../components/Control";

export default {
  computed: {
    gameName() {
      return this.$store.state.gameName
    }
  },
  components: {
    Count,
    Control
  },
  methods: {
    handleUpdateGameName() {
      this.$store.commit({ type: 'setState', key: 'gameName', value: '穿越火线' })
    },
    handleUpdateGameNameBack() {
      this.$store.commit({ type: 'setState', key: 'gameName', value: '绝地求生' })
    }
  },
  mounted() {
    let count = localStorage.getItem("count")
      ? localStorage.getItem("count") * 1
      : 0;
    this.$store.commit({ type: "setCount", count });
  }
};
</script>
