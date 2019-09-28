const { query, queryPromise } = require('./mysqlQuery')

module.exports = {
  devServer: {
    open: true,
    before(app) {
      app.get('/api/get_user_query', async (req, res) => {
        query(`select * from user`, (results) => {
          res.send({
            code: 200,
            data: results,
            message: '用户列表'
          })
        })
      })
      app.get('/api/get_user', async (req, res) => {
        let results = await queryPromise(`select * from user`)
        res.send({
          code: 200,
          data: results,
          message: '用户列表'
        })
      })
    }
  }
}