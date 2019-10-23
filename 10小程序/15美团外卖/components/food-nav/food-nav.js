// components/food-nav/food-nav.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    foodList: Array,
    navCurrentIndex: Number,
    navCurrentId: String
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
    handleNav(e) {
      let { id, index } = e.mark
      this.triggerEvent('onNav', { id, index })
    },
  }
})
