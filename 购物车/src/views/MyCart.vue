<template>
  <div class="m-main">
    <div v-for="(item,index) in myCart" :key="index">
      <el-checkbox v-model="item.checked" @change="handleCheck(index, $event)">{{item.spuName}}</el-checkbox>
      价格：{{item.currentPrice}}，
      数量：
      <el-button @click="handleSub(index)">-</el-button>
      {{item.count}}
      <el-button @click="handleAdd(index)">+</el-button>
      <el-button @click="handleShow(index)">删除</el-button>
    </div>
    <el-checkbox v-model="selectAll" @change="handleSelect">全选</el-checkbox>
    <div>
      总价:{{totalPrice}}，总数:
      {{totalCount}}
    </div>
    <el-dialog title="删除" :visible="dialogVisible" width="230px" :before-close="handleClose">
      <span>确定删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleDelete">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectAll: true,
      totalPrice: 0,
      totalCount: 0,
      dialogVisible: false,
      currentIndex: ""
    };
  },
  computed: {
    myCart() {
      this.total();
      return this.$store.state.myCart;
    }
  },
  methods: {
    total() {
      let myCart = this.$store.state.myCart;
      let count = 0;
      let price = 0;
      myCart
        .filter(item => item.checked)
        .forEach(item => {
          count += item.count;
          price += item.count * item.currentPrice;
        });
      this.totalCount = count;
      this.totalPrice = price;
    },
    handleSub(index) {
      let myCart = this.$store.state.myCart;
      if (myCart[index].count > 1) {
        myCart[index].count = myCart[index].count - 1;
        this.$store.commit({ type: "setMyCart", myCart });
      }
    },
    handleAdd(index) {
      let myCart = this.$store.state.myCart;
      myCart[index].count = myCart[index].count + 1;
      this.$store.commit({ type: "setMyCart", myCart });
    },
    handleDelete() {
      let myCart = this.$store.state.myCart;
      myCart.splice(this.currentIndex, 1);
      this.$store.commit({ type: "setMyCart", myCart });
      this.handleClose();
    },
    handleClose() {
      this.dialogVisible = false;
    },
    handleShow(index) {
      this.currentIndex = index;
      this.dialogVisible = true;
    },
    handleCheck(index, checked) {
      console.log(index, checked);
      let myCart = this.$store.state.myCart;
      myCart[index].checked = checked;
      this.$store.commit({ type: "setMyCart", myCart });
      //所有打勾的商品
      let count = myCart.filter(item => item.checked).length;
      if (count === myCart.length) {
        this.selectAll = true;
      } else {
        this.selectAll = false;
      }
    },
    handleSelect(checked) {
      console.log(checked);
      let myCart = this.$store.state.myCart;

      myCart.forEach(item => {
        item.checked = checked;
      });
      this.$store.commit({ type: "setMyCart", myCart });
    }
  },
  updated() {},
  mounted() {
    let myCart = localStorage.getItem("myCart")
      ? JSON.parse(localStorage.getItem("myCart"))
      : [];
    this.$store.commit({ type: "setMyCart", myCart });

    //所有打勾的商品
    let count = myCart.filter(item => item.checked).length;
    if (count === myCart.length) {
      this.selectAll = true;
    } else {
      this.selectAll = false;
    }
  }
};
</script>

<style>
</style>