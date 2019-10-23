// components/book-list/book-list.js
const app = getApp()
const { host } = app.globalData

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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleDetial(e) {
      let { id } = e.mark
      wx.navigateTo({
        url: `/pages/detail/detail?id=${id}`,
      })
    },
    handleAdd(e) {
      let { item } = e.mark
      wx.request({
        url: `${host}/api/add`,
        data: {
          item
        },
        method: 'post',
        success: (res) => {
          if (res.data.code === 200) {
            this.triggerEvent('onUpdate')
          }
        }
      })
    }
  }
})
