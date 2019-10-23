// pages/home/home.js
const app = getApp()
const { host } = app.globalData

Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 0,
    height: 221,
    navList: [],
    currentId: 0,
    currentList: [],
    srcollTo: ''
  },

  handleAdd(e) {
    let { count } = this.data
    this.setData({
      count: count + 1
    })
  },

  handleSub() {
    let { count } = this.data
    this.setData({
      count: count - 1
    })
  },

  handleLoad(e) {
    var winWid = wx.getSystemInfoSync().windowWidth; 
    let { width, height } = e.detail
    //winWid / height = width / height
    let swiperHeight = winWid * height / width
    this.setData({
      height: swiperHeight
    })
  },

  handleNav(e) {
    //获取id，设置到currentId上
    let { id } = e.detail
    this.setData({
      currentId: id,
      srcollTo: 'm-nav'
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
        this.setData({
          navList: res.data.data
        })
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
    this.setData({
      currentId: 0
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