// pages/home/home.js
//const host = "http://192.168.0.104:3000"
const { host } = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: [
      '/static/images/banner01.jpg',
      '/static/images/banner02.jpg',
      '/static/images/banner03.jpg'
    ],
    height: 150,
    navList: [],
    currentId: 0,
    currentList: [],
    scrollTo: ""
  },

  handleDate(e) {
    let { value } = e.detail
    console.log(value)
  },

  //图片的宽高比等于手机屏幕的宽度和swiper的高度比
  handleImageLoad(e) {
    let { windowWidth } = wx.getSystemInfoSync()
    let { height, width } = e.detail
    height = height /  width * windowWidth
    this.setData({
      height
    })
  },

  handleNav(e) {
    let { id } = e.detail
    this.setData({
      currentId: id,
      scrollTo: "m-nav"
    })

    wx.request({
      url: `${host}/api/list?id=${id}`,
      success: (res) => {
        if (res.data.code === 200) {
          this.setData({
            currentList: res.data.data
          })
        }
      }
    })
  },

  handleUpdate() {
    let { currentId } = this.data

    wx.request({
      url: `${host}/api/list?id=${currentId}`,
      success: (res) => {
        if (res.data.code === 200) {
          this.setData({
            currentList: res.data.data
          })
        }
      }
    })
  },

  handleToLower(e) {
    console.log('滚动到底部')
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
      url: `${host}/api/nav`,
      success: (res) => {
        if (res.data.code === 200) {
          this.setData({
            navList: res.data.data
          })
        }
      }
    })

    wx.request({
      url: `${host}/api/list?id=0`,
      success: (res) => {
        if (res.data.code === 200) {
          this.setData({
            currentList: res.data.data
          })
        }
      }
    })
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