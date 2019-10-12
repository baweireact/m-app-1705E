// miniprogram/pages/mybook/mybook.js
const db = wx.cloud.database()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    myBook: []
  },

  handleDelete(e) {
    let { id } = e.target.dataset
    console.log(id)
    db.collection('myBook').doc(id).remove().then(res => {
      const myBook = db.collection('myBook')
      db.collection('myBook').get().then(res => {
        this.setData({
          myBook: res.data
        })
      })
    })
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