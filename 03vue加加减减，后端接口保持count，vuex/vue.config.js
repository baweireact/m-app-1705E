const bodyParser = require('body-parser')

let count = 0

module.exports = {
  devServer: {
    open: true,
    before(app) {
      app.use(bodyParser.json())

      app.get('/api/get_count', (req, res) => {
        res.send({
          code: 200,
          data: count,
          message: '获取count'
        })
      })

      app.post('/api/update_count', (req, res) => {
        let { newCount } = req.body
        count = newCount
        res.send({
          code: 200,
          data: count,
          message: '更新成功'
        })
      })
    }
  }
}