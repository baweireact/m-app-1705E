const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')
const connect = require('connect')
const history = require('connect-history-api-fallback')
const { bookNavData, bookMallData, bookMallDetailData, userList } = require('./data')

let bookList = []

//使原生http模块可以使用中间件功能
const app = connect()

//处理react前端路由(BrowserRoute)，vue前端路由(mode:history)
app.use(history())

//跨域，静态web服务器
app.use((req, res, next) => {
  //跨域
  res.setHeader('Access-Control-Allow-Origin', '*')  //可以把 * 改成 http://localhost:3000 避免xss攻击
  //res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,HEAD,OPTIONS')   //放行的方法
  res.setHeader('Access-Control-Allow-Headers', 'content-type')  //放行的请求头
  res.setHeader('Access-Control-Max-Age', 1800)  //隔30分钟才发起预检请求，1800秒

  let { pathname } = url.parse(req.url, true)
  let extName = path.extname(pathname)
  console.log(pathname, extName)
  if (pathname === '/') {
    pathname = '/index.html'
  }
  if  (pathname.indexOf('/api') >= 0) {
    next()
  } else {
    fs.readFile(`./public/${pathname}`, (err, data) => {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html' })
        res.end('404')
      } else {
        if (extName === '.css') {
          res.writeHead(200, {'Content-Type': 'text/css'})
        }
        res.end(data)
      }
    })
  }
})

//接口
app.use((req, res) => {
  let { pathname } = url.parse(req.url, true)

  if (req.method == 'OPTIONS') { //跨域，处理options请求
    res.writeHead(204) //204 无内容
    res.end()
  } else if (req.method === 'POST' && pathname === '/api/login') { //登录
    let body = ''

    // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到body变量中
    req.on('data', (chunk) => {
      body += chunk
    })

    // 在end事件触发后，通过JSON.parse将body解析为真正的POST请求格式
    req.on('end', () =>{
      body = JSON.parse(body)
      let { username, password } = body
      let user = userList.find(item => item.username === username)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      if (user) {
        if (user.password === password) {
          res.write(JSON.stringify({
            code: 200,
            data: {
              username
            },
            message: '登录成功'
          }))
        } else {
          res.write(JSON.stringify({
            code: 400,
            message: '密码错误'
          }))
        }
      } else {
        res.write(JSON.stringify({
          code: 400,
          data: body,
          message: '用户不存在'
        }))
      }
      res.end()
    })
  } else if (pathname === '/api/nav') {  //导航
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      code: 200,
      data: bookNavData,
      message: '导航'
    }))
  } else if (pathname === '/api/list') {  //列表
    let { id } = url.parse(req.url, true).query
    let list = bookMallData.find(item => item.id == id).list
    list.forEach(item => {
      if (bookList.findIndex(book => book.id === item.id) >= 0) {
        item.is_in_my_book = true
      } else {
        item.is_in_my_book = false
      }
    })
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      code: 200,
      data: list,
      message: '列表'
    }))
  } else if (pathname === '/api/get_book_list') { //书包
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      code: 200,
      data: bookList,
      message: '书包'
    }))
  } else if (pathname === '/api/add') {  //添加到书包
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
    })

    req.on('end', () => {
      body = JSON.parse(body)
      let { item } = body
      bookList.push(item)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        code: 200,
        data: bookList,
        message: '添加成功'
      }))
    })
  } else if (pathname === '/api/detail') {  //详情
    let { id } = url.parse(req.url, true).query
    let detail
    bookMallDetailData.forEach(listItem => {
      listItem.list.forEach(book => {
        if (book.id == id) {
          detail = book
        }
      })
    })

    if (bookList.find(book => book.id === detail.id)) {
      detail.is_in_my_book = true
    } else {
      detail.is_in_my_book = false
    }
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      code: 200,
      data: detail,
      message: '详情'
    }))
  } else if (pathname === '/api/delete') {  //删除
    let body = ''
    req.on('data', (chunk) => {
      body +=chunk
      console.log('chunk:', chunk)
    })
    req.on('end', () => {
      body = JSON.parse(body)
      let { ids } = body
      bookList = bookList.filter(item => !ids.find(id => id === item.id))
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        code: 200,
        data: bookList,
        message: '删除成功'
      }))
    })
  } else if (pathname === '/api/update') {  //更新
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
    })
    req.on('end', () => {
      body = JSON.parse(body)
      let { bookListNew } = body
      bookList = bookListNew
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        code: 200,
        data: bookList,
        message: '更新成功'
      }))
    })
  } else {   //404
    res.writeHead(404, { 'Content-Type': 'text/html' })
    res.end('404')
  }
})

const server = http.createServer(app)

server.listen(80)
console.log(80)