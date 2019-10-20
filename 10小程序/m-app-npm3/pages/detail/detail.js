// pages/detail/detail.js
const { host } = getApp().globalData

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let { id } = options
    wx.request({
      url: `${host}/api/detail?id=${id}`,
      success: (res) => {
        if (res.data.code === 200) {
          this.setData({
            detail: res.data.data
          })
        }
      }
    })
  },

  handleAdd(e) {
    let { item } = e.mark
    wx.request({
      url: `${host}/api/add`,
      data: {
        item
      },
      method: "post",
      success: (res) => {
        if (res.data.code === 200) {
          let { detail } = this.data
          detail.is_in_my_book = true
          this.setData({
            detail
          })
        }
      }
    })
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