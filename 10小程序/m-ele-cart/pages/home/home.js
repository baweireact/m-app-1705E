// pages/home/home.js
const { host } = getApp().globalData

Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodList: [],
    listCurrentId: 'id_0',  //控制右侧scroll-view滚动到指定位置，id 属性值格式，应以字母开头，且只能包含字母、数字、中划线、下划线、英文冒号和英文句点。
    navCurrentIndex: 0,  //控制左侧tab高亮
    navCurrentId: 'id_0' //控制左侧scroll-view的滚动
  },

  handleNav(e) {
    let { id, index } = e.detail
    this.setData({
      listCurrentId: id,
      navCurrentIndex: index
    })
  },

  handleCurrentIndex(e) {
    let { index, id } = e.detail
    this.setData({
      navCurrentIndex: index,
      navCurrentId: id
    })
  },

  handleUpdateFoodList(e) {
    let { foodList } = this.data
    let { index, foodIndex, count } = e.detail
    foodList[index].spuList[foodIndex].count = count
    this.setData({
      foodList
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
      url: `${host}/api/food_list`,
      success: (res) => {
        if (res.data.code === 200) {
          this.setData({
            foodList: res.data.data
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