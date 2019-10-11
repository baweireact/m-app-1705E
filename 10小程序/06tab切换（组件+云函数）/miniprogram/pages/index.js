// miniprogram/pages/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    navList: []
  },

  handleNav(e) {
    let { index } = e.detail
    this.setData({
      currentIndex: index
    })
  },

  onLoad() {
    wx.cloud.callFunction({
      name: "api_nav"
    }).then(res => {
      console.log(res)
      if (res.result.code === 200) {
        this.setData({
          navList: res.result.data
        })
      }
    })
  }
})