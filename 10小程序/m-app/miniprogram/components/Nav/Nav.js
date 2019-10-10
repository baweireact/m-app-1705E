// components/Nav/Nav.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    navList: Array,
    currentIndex: Number
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
      let { index } = e.target.dataset
      this.setData({
        currentIndex: index
      })
    }
  }
})
