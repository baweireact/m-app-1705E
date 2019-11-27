// pages/cart/cart.js
const { host, handleSetTabBarBadge } = getApp().globalData

Page({

  /**
   * 页面的初始数据
   */
  data: {
    myBook: [],
    totalPrice: 0,
    totalCount: 0,
    selectAll: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.request({
      url: `${host}/api/my_book`,
      success: (res) => {
        if (res.data.code === 200) {
          let myBook = res.data.data
          this.setData({
            myBook
          })
          this.total(myBook)
          let count = myBook.filter(item => item.checked).length
          this.setData({
            selectAll: myBook.length === count && myBook.length > 0
          })
          handleSetTabBarBadge(myBook.length)
        }
      }
    })
  },

  handleCheckbox(e) {
    let { myBook } = this.data
    let { value } = e.detail
    myBook.forEach(item => {
      if (value.find(id => id == item.id)) {
        item.checked = true
      } else {
        item.checked = false
      }
    })
    this.handleUpdate(myBook)
    let count = myBook.filter(item => item.checked).length
    this.setData({
      selectAll: myBook.length === count && myBook.length > 0
    })
  },

  handleAdd(e) {
    let { index } = e.mark
    let { myBook } = this.data
    myBook[index].count = myBook[index].count + 1
    this.setData({
      myBook
    })
    this.handleUpdate(myBook)
  },

  handleSub(e) {
    let { index } = e.mark
    let { myBook } = this.data
    if (myBook[index].count <= 1) {
      return
    }
    myBook[index].count = myBook[index].count - 1
    this.setData({
      myBook
    })
    this.handleUpdate(myBook)
  },

  handleDelete(e) {
    let { index } = e.mark
    let { myBook } = this.data
    myBook.splice(index, 1)
    this.setData({
      myBook
    })
    this.handleUpdate(myBook)
  },

  handleDeletes() {
    let { myBook } = this.data
    myBook = myBook.filter(item => !item.checked)
    this.setData({
      myBook
    })
    this.handleUpdate(myBook)
  },

  total(myBook) {
    let totalPrice = 0, totalCount = 0
    myBook.filter(item => item.checked).forEach(item => {
      totalCount += item.count
      totalPrice += item.count * item.price
    })
    this.setData({
      totalCount,
      totalPrice
    })
  },

  handleUpdate(myBook) {
    this.total(myBook)
    handleSetTabBarBadge(myBook.length)
    wx.request({
      url: `${host}/api/update`,
      data: {
        myBookNew: myBook
      },
      method: 'post',
      success: (res) => {
        if (res.data.code === 200) {
          this.setData({
            myBook: res.data.data
          })
        }
      }
    })
  },

  handleSelectAll(e) {
    let { value } = e.detail
    let { myBook } = this.data
    myBook.forEach(item => {
      item.checked = value.length === 1
    })

    this.setData({
      myBook
    })
    this.handleUpdate(myBook)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})