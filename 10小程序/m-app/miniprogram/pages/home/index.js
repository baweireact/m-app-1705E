// miniprogram/pages/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    navList: [],
    currentList: []
  },

  //tab切换
  handleNav(e) {
    let { index, id } = e.detail
    this.setData({
      currentIndex: index
    })

    wx.cloud.callFunction({
      name: 'api_book_list',
      data: {
        id
      }
    }).then(res => {
      if (res.result.code === 200) {
        this.setData({
          currentList: res.result.data
        })
      }
    })
  },

  //生命周期
  onLoad() {
    wx.cloud.callFunction({
      name: "api_nav"
    }).then(res => {
      if (res.result.code === 200) {
        this.setData({
          navList: res.result.data
        })
      }
    })

    wx.cloud.callFunction({
      name: 'api_book_list',
      data: {
        id: 0
      }
    }).then(res => {
      if (res.result.code === 200) {
        this.setData({
          currentList: res.result.data
        })
      }
    })
  }
})