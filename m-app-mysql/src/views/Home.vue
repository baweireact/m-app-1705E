<template>
  <div class="home">
    <el-button @click="handleDelete(selected)">删除</el-button>
    <el-table :data="userList" @selection-change="handleSelect">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="password" label="密码"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleDelete([scope.row.id])">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Api from "../api";

export default {
  data() {
    return {
      userList: [],
      selected: []
    };
  },
  methods: {
    handleDelete(ids) {
      console.log(this.selected)
      Api.deleteUser({ids}).then(res => {
        if (res.data.code === 200) {
          this.getUser()
        }
      });
    },
    getUser() {
      Api.getUser().then(res => {
        if (res.data.code === 200) {
          this.userList = res.data.data;
        }
      });
    },
    handleSelect(selected) {
      this.selected = selected.map(item => item.id)
    }
  },
  mounted() {
    this.getUser()
  }
};
</script>
