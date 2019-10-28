const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const fs = require('fs')
const { bookNavData, bookMallData } = require('./data.js')
const { queryPromise } = require('./mysqlQuery')

let bookList = []

//用户列表
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

const app = new Koa()
const router = new Router()

//导航
router.get('/api/nav', (ctx, next) => {
  ctx.body = {
    code: 200,
    data: bookNavData,
    message: '导航'
  }
})

//登录
router.post('/api/login', async (ctx, next) => {
  let { username, password } = ctx.request.body

  //模拟数据库
  //let user = userList.find(item => item.username === username)

  //真实数据库
  let userList = await queryPromise('select * from user')
  let user = userList.find(item => item.username === username)
  if (user) {
    if (user.password === password) {
      ctx.body = {
        code: 200,
        data: {
          username
        },
        message: '登录成功'
      }
    } else {
      ctx.body = {
        code: 400,
        message: '密码错误'
      }
    }
  } else {
    ctx.body = {
      code: 400,
      message: '用户不存在'
    }
  }
})

//列表
router.get('/api/list', (ctx) => {
  console.log('aaa:', ctx)
  let { id } = ctx.request.query
  let list = bookMallData.find(item => item.id == id).list
  list.forEach(item => {
    if (bookList.findIndex(book => book.id === item.id) >= 0) {
      item.is_in_my_book = true
    } else {
      item.is_in_my_book = false
    }
  })
  ctx.body = {
    code: 200,
    data: list,
    message: '列表'
  }
})

//书包
router.get('/api/get_book_list', (ctx) => {
  ctx.body = {
    code: 200,
    data: bookList,
    message: '书包'
  }
})

//详情
router.get('/api/detail', (ctx) => {
  let { id } = ctx.request.query
  let detail
  bookMallData.forEach(listItem => {
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

  ctx.body = {
    code: 200,
    data: detail,
    message: '详情'
  }
})

//添加
router.post('/api/add', (ctx) => {
  let { item } = ctx.request.body
  bookList.push(item)
  ctx.body = {
    code: 200,
    data: bookList,
    message: '添加成功'
  }
})

//更新书包
router.post('/api/update', (ctx) => {
  let { bookListNew } = ctx.request.body
  bookList = bookListNew
  ctx.body = {
    code: 200,
    data: bookList,
    message: '更新成功'
  }
})

//删除一个或多个，删
router.post('/api/delete', ctx => {
  let { ids } = ctx.request.body
  bookList = bookList.filter(item => !ids.find(id => id === item.id))
  ctx.body = {
    code: 200,
    data: bookList,
    message: '删除成功'
  }
})

//返回html页面
router.get('/html_page', ctx => {
  ctx.type = 'html'
  ctx.body = `<html>
    <body>
      <div style="color:red">hello world!</div>
    </body>
  </html>`
})

//返回text
router.get('/text_page', ctx => {
  ctx.type = 'text'
  ctx.body = `<html>
    <body>
      <div style="color:red">hello world!</div>
    </body>
  </html>`
})

//返回模板页面
router.get('/template_page', ctx => {
  ctx.type = 'html'
  ctx.body = fs.createReadStream('./template/index.html')
})

//查
// router.get('/api/get_user', async ctx => {
//   let token = req.headers.token
//   let isLogin = await checkToken(token)
//   if (isLogin) {
//     let users = await queryPromise('select * from user')
//     res.send({
//       code: 200,
//       data: users,
//       message: '用户列表'
//     })
//   } else {
//     res.send({
//       code: 403,
//       message: '登录过期'
//     })
//   }
// })

//跨域
app.use(cors())

//解析post请求
app.use(bodyParser())

//日志
app.use(async (ctx, next) => {
  await next()
  console.log(ctx.request.url)
})

//路由
app.use(router.routes())

app.listen(8888)

console.log(8888)