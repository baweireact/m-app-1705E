const { carList } = require('./data.js')

module.exports = {
  devServer: {
    open: true,
    before(app) {
      app.get('/api/car_list', (req, res) => {
        res.send({
          code: 200,
          data: carList,
          message: '汽车列表'
        })
      })
    }
  }
}