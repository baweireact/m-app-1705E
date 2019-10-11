const { footList } = require('./data.js')

module.exports = {
  devServer: {
    open: true,
    before(app) {
      app.get('/api/list', (req, res) => {
        res.send({
          code: 200,
          data: footList,
          message: '列表'
        })
      })
    }
  }
}