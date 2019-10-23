<template>
  <div class="about">
    <input v-model="address" placeholder="地址">
    <input v-model="phone" placeholder="手机号">
    <button @click="handleAdd">添加</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      address: '',
      phone: ''
    }
  },
  methods: {
    handleAdd() {
      let list = this.$store.state.list
      if (this.address.trim() === '') {
        alert('地址不能为空！')
        return
      }
      if (this.phone.trim() === '') {
        alert('手机号不能为空！')
        return
      }
      list.push({
        id: (new Date()).getTime(),
        address: this.address,
        phone: this.phone
      })
      this.address = ''
      this.phone = ''
      this.$store.commit({ type: 'update', list })
    }
  }
}
</script>