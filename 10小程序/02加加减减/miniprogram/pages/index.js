// miniprogram/pages/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 0
  },

  handleAdd() {
    let { count } = this.data
    this.setData({
      count: ++count
    })
  },

  handleSub() {
    let { count } = this.data
    this.setData({
      count: --count
    })
  }
})