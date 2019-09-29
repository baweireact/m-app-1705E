const express = require('express')
const cors = require('cors')
const redis = require('redis')
const bodyParser = require('body-parser')
const jwt = require('jwt-simple')
const { queryPromise } = require('./mysqlQuery')

const app = express()

//跨域
app.use(cors())
app.use(bodyParser.json())

var secret = 'xxx';

//如果没有启动redis,会报错，启动redis方法，在cd到redis的安装目录，执行redis-server.exe redis.windows.conf
const client = redis.createClient()
client.on('error', (err) => {
  console.log('redis错误：' + err)
})

//检查token是否存在
const checkToken = async (token) => {
  let result = await new Promise((resolve) => {
    client.get(token, function (err, res) {
      return resolve(res);
    });
  });
  if (result) {
    client.set(token, token , 'EX', 60)
    return true
  } else {
    return false
  }
}

//获取用户列表
app.get('/api/get_user', async (req, res) => {
  let token = req.headers.token
  let tokenIsRight = await checkToken(token)
  if (tokenIsRight) {
    let users = await queryPromise('select * from user')
    res.send({
      code: 200,
      data: users,
      message: '用户列表'
    })
  } else {
    res.send({
      code: 403,
      message: '登录过期'
    })
  }
})

//登录
app.post('/api/login', async (req, res) => {
  let { username, password } = req.body
  let users = await queryPromise('select * from user')
  let user = users.find(item => item.username === username && item.password === password)
  if (user) {
    let token = jwt.encode(user.id, secret)
    client.set(token, token , 'EX', 60)  //60秒后验证码过期知道
    res.send({
      code: 200,
      data: {
        username,
        token
      },
      message: '登录成功'
    })
  } else {
    res.send({
      code: 400,
      message: '登录失败'
    })
  }
})

app.listen(3000, () => {
  console.log('3000端口')
})