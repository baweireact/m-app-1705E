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
    count = count + 1
    this.setData({
      count
    })

    wx.setStorage({
      key: 'count',
      data: count,
    })
  },

  handleSub() {
    let { count } = this.data
    count = count - 1
    this.setData({
      count
    })

    wx.setStorage({
      key: 'count',
      data: count,
    })
  },

  onLoad() {
    wx.getStorage({
      key: 'count',
      success: (res) => {
        this.setData({
          count: res.data
        })
      },
    })
    console.log(1)
  }
})