<template>
  <div class="home">
    <div v-for="(item,index) in list" :key="item.id">
      地址：{{item.address}}，手机号：{{item.phone}}<button @click="handleDelete(index)">删除</button>
      <button @click="handleShowDialog(index, item)">编辑</button>
    </div>
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="400px"
      :before-close="handleClose">
      <input v-model="item.address" placeholder="请输入地址"/>
      <input v-model="item.phone" placeholder="请输入手机号"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      item: {},
      index: 0,
    }
  },
  computed: {
    list() {
      return this.$store.state.list
    }
  },
  methods: {
    handleDelete(index) {
      let list = this.list
      list.splice(index, 1)
      this.$store.commit({ type: 'update', list })
    },
    handleShowDialog(index, item) {
      this.dialogVisible = true
      let cloneItem = JSON.parse(JSON.stringify(item))
      this.item = cloneItem
      this.index = index
    },
    handleClose() {
      this.dialogVisible = false
    },
    handleConfirm() {
      this.dialogVisible = false
      let list = this.list
      list[this.index].address = this.item.address
      list[this.index].phone = this.item.phone
      this.$store.commit({ type: 'update', list })
    }
  },
  mounted() {
    let list = JSON.parse(localStorage.getItem('list')) || []
    this.$store.commit({ type: 'update', list })
  }
}
</script>
