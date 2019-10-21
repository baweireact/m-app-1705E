// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 0,
    height: 221,
    navList: [
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
    ],
    currentId: 0
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
      currentId: id
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