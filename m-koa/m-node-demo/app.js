const http = require('http')
const fs = require('fs')
const url = require('url')
const { bookNavData, bookMallData } = require('./data')

const userList = [{
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

let bookList = []

const server = http.createServer((req, res) => {
  //跨域
  res.setHeader('Access-Control-Allow-Origin', '*')  //可以把 * 改成 http://localhost:3000 避免xss攻击
  //res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,HEAD,OPTIONS')   //放行的方法
  res.setHeader('Access-Control-Allow-Headers', 'content-type')  //放行的请求头
  res.setHeader('Access-Control-Max-Age', 1800)  //隔30分钟才发起预检请求，1800秒
  
  let { pathname } = url.parse(req.url, true)
  console.log(req.method, url.parse(req.url, true))
  console.log(pathname)

  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write('hello world!')
    res.end()
  } else if (req.url === '/home') {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    const home = fs.readFileSync('./index.html')   //读文件
    res.end(home)
  } else if (req.url === '/banner01') {
    res.writeHead(200, { 'Content-Type': 'image/jpg' })
    const banner01 = fs.readFileSync('./images/banner01.jpg')  //读图片
    res.end(banner01)
  } else if (req.method == 'OPTIONS') { //跨域，处理options请求
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
    res.write(JSON.stringify({
      code: 200,
      data: bookNavData,
      message: '导航'
    }))
    res.end()
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
    res.write(JSON.stringify({
      code: 200,
      data: list,
      message: '列表'
    }))
    res.end()
  } else if (pathname === '/api/get_book_list') { //书包
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify({
      code: 200,
      data: bookList,
      message: '书包'
    }))
    res.end()
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
      res.write(JSON.stringify({
        code: 200,
        data: bookList,
        message: '添加成功'
      }))
      res.end()
    })
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' })
    res.end('404')
  }
})

server.listen(9999, () => {
  console.log(9999)
})

