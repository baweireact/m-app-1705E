// miniprogram/pages/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    nav: [
      {
        id: 0,
        title: '武侠'
      },
      {
        id: 1,
        title: '都市'
      },
      {
        id: 2,
        title: '科幻'
      }
    ]
  },

  handleNav(e) {
    let { index } = e.target.dataset
    this.setData({
      currentIndex: index
    })
  }
})