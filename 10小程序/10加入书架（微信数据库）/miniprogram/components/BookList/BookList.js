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
   * 组件的初始数据
   */
  data: {

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
      // wx.cloud.callFunction({
      //   name: 'api_book_add',
      //   data: {
      //     item
      //   }
      // }).then(res => {
      //   if (res.result.code === 200) {

      //   }
      // })

      db.collection('myBook').add({
        data: {
          item
        }
      }).then(res => {

      })
    }
  }
})
