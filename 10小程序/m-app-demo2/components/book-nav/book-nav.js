// components/book-nav/book-nav.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    navList: Array,
    currentId: Number
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
      console.log(e)
      let { id } = e.target.dataset
      this.triggerEvent('onNav', { id })
    }
  }
})
