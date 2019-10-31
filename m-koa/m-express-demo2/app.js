const express = require('express')
const { bookNavData, bookMallData, bookMallDetailData } = require('./data')
const bodyParser = require('body-parser')
const cors = require('cors')
const history = require('connect-history-api-fallback')

const app = express()

//用户列表
let userList = [{
  id: '001',
  username: 'admin',
  password: '123456'
}, {
  id: '002',
  username: 'xu',
  password: '123'
}, {
  id: '003',
  username: 'a',
  password: '123456'
}]

//书包
let myBook = []

//跨域
app.use(cors())
//解析post请求

// parse application/json
app.use(bodyParser.json())
app.use(history())

// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }))

//静态web服务器
app.use(express.static( __dirname + '/public'))
 
//登录
app.post('/api/login', (req, res) => {
  let { username, password } = req.body
  console.log(JSON.stringify(req.body))
  console.log(username, password)
  let user = userList.find(item => item.username === username)
  if (user) {
    if (user.password === password) {
      res.send({
        code: 200,
        data: {
          username
        },
        message: '登录成功'
      })
    } else {
      res.send({
        code: 400,
        message: '密码错误'
      })
    }
  } else {
    res.send({
      code: 400,
      message: '用户名不存在'
    })
  }

})

//导航
app.get('/api/nav', (req, res) => {
  res.send({
    code: 200,
    data: bookNavData,
    message: '导航'
  })
})

//列表
app.get('/api/list', (req, res) => {
  let { id } = req.query
  let list = bookMallData.find(item => item.id == id).list
  list.forEach(item => {
    item.is_in_my_book = myBook.findIndex(book => book.id === item.id) >= 0
  })
  res.send({
    code: 200,
    data: list,
    message: '列表'
  })
})

//详情
app.get('/api/detail', (req, res) => {
  let { id } = req.query
  let detail 
  bookMallDetailData.forEach(item => {
    item.list.forEach(book => {
      if (book.id == id) {
        book.is_in_my_book = myBook.findIndex(item => item.id === book.id) >= 0
        detail = book
      }
    })
  })

  res.send({
    code: 200,
    data: detail,
    message: '详情'
  })
})

//更新书包
app.post('/api/update_my_book', (req, res) => {
  let { myBookNew } = req.body
  myBook = myBookNew
  res.send({
    code: 200,
    data: myBook,
    message: '更新成功'
  })
})

//添加
app.post('/api/add', (req, res) => {
  let { book } = req.body
  myBook.push(book)
  res.send({
    code: 200,
    data: myBook,
    message: '添加成功'
  }) 
})

//获取书包
app.get('/api/get_my_book', (req, res) => {
  res.send({
    code: 200,
    data: myBook,
    message: '书包'
  })
})

app.listen(8001)
console.log(8001)