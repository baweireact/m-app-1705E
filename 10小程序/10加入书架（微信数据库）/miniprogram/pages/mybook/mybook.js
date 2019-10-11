// miniprogram/pages/mybook/mybook.js
const db = wx.cloud.database()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    myBook: []
  },

  onShow: function (options) {
    const myBook = db.collection('myBook')
    db.collection('myBook').get().then(res => {
      this.setData({
        myBook: res.data
      })
    })
  },
})