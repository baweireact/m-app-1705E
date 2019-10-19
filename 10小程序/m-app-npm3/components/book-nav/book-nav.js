// components/book-nav/book-nav.js
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
      let { index, id } = e.target.dataset
      console.log(this)
      this.triggerEvent('onNav', { index, id })
    }
  }
})
