<template>
  <div>
    <div v-for="(item, index) in myBook" :key="item.id">
      <input type="checkbox" :checked="item.checked" @change="handleChecked(index, $event)" :id="item.id">
      <label :for="item.id">{{item.title}}</label>
      ,￥{{item.price}} 
      <button @click="handleSub(index)">-</button> <span>{{item.count}}</span> <button @click="handleAdd(index)">+</button>
      <button @click="handleDelete(index)">删除</button>
    </div>
    <div>
      <input type="checkbox" :checked="total.selectAll" id="m-select-all" @change="handleSelectAll($event)">
      <label for="m-select-all">全选</label> <button @click="handleDeleteAll()">删除</button>
    </div>
    <div>
      总价：￥{{total.totalPrice}}，总数：{{total.totalCount}}
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    myBook() {
      return this.$store.state.myBook
    },
    total() {
      let myBook = this.$store.state.myBook
      let totalPrice = 0, totalCount = 0
      myBook.filter(item => item.checked).forEach(item => {
        totalCount += item.count
        totalPrice += item.count * item.price
      })
      return {
        totalPrice,
        totalCount,
        selectAll: myBook.filter(item => item.checked).length === myBook.length
      }
    }
  },
  methods: {
    handleDelete(index) {
      this.myBook.splice(index, 1)
      this.$store.commit({ type: 'setState', key: 'myBook', value: this.myBook })
    },
    handleDeleteAll() {
      let myBook = this.myBook.filter(item => !item.checked)
      this.$store.commit({ type: 'setState', key: 'myBook', value: myBook })
    },
    handleAdd(index) {
      this.myBook[index].count += 1
      this.$store.commit({ type: 'setState', key: 'myBook', value: this.myBook })
    },
    handleSub(index) {
      if (this.myBook[index].count > 1) {
        this.myBook[index].count -= 1
        this.$store.commit({ type: 'setState', key: 'myBook', value: this.myBook })
      }
    },
    handleChecked(index, e) {
      this.myBook[index].checked = e.target.checked
      this.$store.commit({ type: 'setState', key: 'myBook', value: this.myBook })
    },
    handleSelectAll(e) {
      this.myBook.forEach(item => {
        item.checked = e.target.checked 
      })
      this.$store.commit({ type: 'setState', key: 'myBook', value: this.myBook })
    }
  },
  updated() {
    this.$store.dispatch({ type: 'updateMyBook', myBook: this.myBook })
  },
  mounted() {
    this.$store.dispatch({ type: 'getMyBook' })
  }
}
</script>

<style>

</style>