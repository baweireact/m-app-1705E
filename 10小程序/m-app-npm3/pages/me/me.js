// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: '',
    src: ''
  },

  handleLogin() {
    wx.login({
      success: (res) => {
        console.log('登录：', res)
        wx.showModal({
          title: '登录',
          content: res.code,
        })
      }
    })

    // wx.getUserInfo({
    //   success: (res) => {
    //     console.log('用户信息：', res)
    //   }
    // })

    // const accountInfo = wx.getAccountInfoSync()
    // console.log('账号信息:', accountInfo)

    // wx.getSetting({
    //   success: (res) => {
    //     console.log('已授权:', res)
    //   }
    // })

    // wx.getLocation({
    //   success: function(res) {
    //     console.log('地理位置:', res)
    //   },
    // })

    // wx.chooseLocation({
    //   success: function(res) {
    //     console.log('选择位置:', res)
    //   },
    // })
  },

  handleAddress() {
    wx.chooseAddress({
      success: (res) => {
        console.log('选择地址：', res)
      }
    })
  },

  handleStep() {
    wx.getWeRunData({
      success: (res) => {
        console.log('步数：', res)
        this.setData({
          message: JSON.stringify(res)
        })
      }
    })
  },

  handleCamera() {
    const ctx = wx.createCameraContext(this)
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log('拍照：', res)
        this.setData({
          src: res.tempImagePath
        })
        wx.saveImageToPhotosAlbum({
          filePath: res.tempImagePath,
        })
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