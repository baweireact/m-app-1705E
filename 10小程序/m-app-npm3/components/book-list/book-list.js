// components/book-list/book-list.js
const { host } = getApp().globalData

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    currentList: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    myBook: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleDetail(e) {
      let { id } = e.mark
      wx.navigateTo({
        url: `/pages/detail/detail?id=${id}`
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
            this.triggerEvent('onUpate')
          }
        }
      })
    }
  }
})
