// miniprogram/pages/index.js
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    navList: [],
    currentList: []
  },

  //tab切换
  handleNav(e) {
    let { index, id } = e.detail
    this.setData({
      currentIndex: index
    })

    wx.cloud.callFunction({
      name: 'api_book_list',
      data: {
        id
      }
    }).then(res => {
      if (res.result.code === 200) {
        this.setData({
          currentList: res.result.data
        })
      }
    })
  },

  //生命周期
  onLoad() {
    wx.cloud.callFunction({
      name: "api_nav"
    }).then(res => {
      if (res.result.code === 200) {
        this.setData({
          navList: res.result.data
        })
      }
    })

    wx.cloud.callFunction({
      name: 'api_book_list',
      data: {
        id: 0
      }
    }).then(res => {
      if (res.result.code === 200) {
        this.setData({
          currentList: res.result.data
        })
      }
    })

    // db.collection('myBook').add({
    //   // data 字段表示需新增的 JSON 数据
    //   data: {
    //     // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
    //     name: '张三'
    //   },
    //   success: function (res) {
    //     // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
    //     console.log(res)
    //   }
    // })

    db.collection('myBook').get().then(res => {
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      console.log(res.data)
    })
    
  }
})