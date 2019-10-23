// components/food-list/food-list.js
let appInstance = getApp()
let { host } = appInstance.globalData

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    foodList: Array,
    listCurrentId: String,
    navCurrentIndex: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    listDomInfo: [],
    myCart: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleScroll(e) {
      //console.log(e.detail)
      let { scrollTop } = e.detail
      let { listDomInfo, navCurrentIndex } = this.data
      //scrollTop 是滚动条滚动后距离滚动条顶部的高度，listDomInfo里保存的是dom距离页面顶部的高度
      //加20是为了容错， 滚动条即将滚动的下一个分类时（差20px）就触发
      scrollTop = scrollTop + listDomInfo[0].top + 20
      for (let i = 0; i < listDomInfo.length - 1; i++) {
        if (listDomInfo[i].top < scrollTop && scrollTop < listDomInfo[i + 1].top) {
          if (navCurrentIndex != i) {
            //滚动右侧，控制左侧的高亮，点击左侧控制右侧的滚动
            this.triggerEvent('onCurrentIndex', { index: i, id: listDomInfo[i].id })
            console.log(i, listDomInfo[i])
          }
          break
        }
      }
    },
    handleAdd(e) {
      let { food, index, foodIndex } = e.mark
      let { myCart } = this.data
      let tempIndex = myCart.findIndex(item => item.spuId == food.spuId)
      let count = 1
      if (tempIndex >= 0) {
        myCart[tempIndex].count += 1
        count = myCart[tempIndex].count
      } else {
        food.count = count
        myCart.push(food)
      }

      wx.request({
        url: `${host}/api/update_my_cart`,
        data: {
          newMyCart: myCart
        },
        method: 'post',
        success: (res) => {
          if (res.data.code === 200) {
            this.triggerEvent('onUpdateFoodList', { index, foodIndex, count})
          }
        }
      })

      appInstance.globalData.count += 1
      console.log(appInstance.globalData)

    },
    handleSub(e) {
      let { food, index, foodIndex } = e.mark
      let { myCart } = this.data
      let tempIndex = myCart.findIndex(item => item.spuId === food.spuId)
      if (tempIndex >= 0) {
        if (myCart[tempIndex].count >= 2) {
          myCart[tempIndex].count -= 1
        } else {
          myCart.splice(tempIndex, 1)
        }
      }

      wx.request({
        url: `${host}/api/update_my_cart`,
        data: {
          newMyCart: myCart
        },
        method: 'post',
        success: (res) => {
          if (res.data.code === 200) {
            this.triggerEvent('onUpdateFoodList', { index, foodIndex, count: food.count - 1 })
          }
        }
      })
    }
  },

  lifetimes: {
    //组件生命周期函数-在组件布局完成后执行
    ready: function () {
      //查询每个分类的dom，并把信息保存起来备用
      //in 将选择器的选取范围更改为自定义组件 component 内。（初始时，选择器仅选取页面范围的节点，不会选取任何自定义组件中的节点）。
      const query = wx.createSelectorQuery().in(this)
      //selectAll 在当前页面下选择匹配选择器 selector 的所有节点。
      //boundingClientRect 添加节点的布局位置的查询请求。回调函数，在执行 SelectorQuery.exec 方法后，节点信息会在 callback 中返回
      //exec 执行所有的请求。请求结果按请求次序构成数组，在callback的第一个参数中返回。
      query.selectAll('.js-food-list-item').boundingClientRect((res) => {
        this.setData({
          listDomInfo: res
        })
        console.log(res)
      }).exec()

      wx.request({
        url: `${host}/api/get_my_cart`,
        success: (res) => {
          if (res.data.code === 200) {
            this.setData({
              myCart: res.data.data
            })
          }
        }
      })
    },
  }
})
