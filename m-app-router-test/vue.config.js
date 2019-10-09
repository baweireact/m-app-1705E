const { bookNavData, bookMallData } = require('./data.js')
const bodyPaser = require('body-parser')

let myBook = []

module.exports = {
  devServer: {
    open: true,
    before(app) {

      //使用中间件
      app.use(bodyPaser.json())

      app.get('/api/get_nav', (req, res) => {
        res.send({
          code: 200,
          data: bookNavData,
          message: '导航'
        })
      })

      //tab切换时，更新列表数据里的数据
      app.get('/api/get_list', (req, res) => {
        let { id } = req.query
        let list = bookMallData.find(item => item.id == id).list
        list = list.map(item => {
          if (myBook.find(book => book.id === item.id)) {
            item.is_in_my_book = true
          } else {
            item.is_in_my_book = false
          }
          return item
        })
        res.send({
          code: 200,
          data: list,
          message: '列表'
        })
      })

      //查
      app.get('/api/get_my_book', (req, res) => {
        res.send({
          code: 200,
          data: myBook,
          message: '书架'
        })
      })

      //增加一本书，增
      app.post('/api/add_book', (req, res) => {
        let { item } = req.body
        myBook.push(item)
        res.send({
          code: 200,
          data: myBook,
          message: '添加成功'
        })
      })
    }
  }
}