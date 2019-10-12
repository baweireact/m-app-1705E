// components/BookList/BookList.js
const db = wx.cloud.database()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    currentList: Array
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleDetail(e) {
      let { id } = e.target.dataset
      wx.navigateTo({
        url: `/pages/detail/detail?id=${id}`,
      })
    },
    handleAdd(e) {
      let { item } = e.target.dataset
      db.collection('myBook').add({
        data: {
          ...item
        }
      }).then(res => {
        this.triggerEvent('onGetList')
      })
    }
  }
})
