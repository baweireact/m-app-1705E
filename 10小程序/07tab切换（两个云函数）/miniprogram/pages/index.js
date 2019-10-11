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

    wx.cloud.callFunction({
      name: 'api_book_list',
      data: {
        id: 0
      }
    }).then(res => {
      if (res.result.code === 200) {
        console.log(res)
        this.setData({
          currentList: res.result.data
        })
      }
    })
  }
})