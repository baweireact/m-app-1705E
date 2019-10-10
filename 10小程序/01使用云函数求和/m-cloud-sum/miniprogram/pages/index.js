
Page({
  data: {
    a: '',
    b: '',
    sum: ''
  },
  handleInput(e) {
    this.setData({
      [e.target.dataset.field]: e.detail.value
    })
  },
  handleSum() {
    wx.cloud.callFunction({
      name: 'sum',
      data: {
        a: this.data.a,
        b: this.data.b
      }
    }).then(res => {
      console.log(res.result.sum)
      this.setData({
        sum: res.result.sum
      })
    })
  }
})