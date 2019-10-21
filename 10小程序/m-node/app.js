const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { foodData } = require('./data.js')


const app = express()

//跨域
app.use(cors())
app.use(bodyParser.json())

app.get('/api/food_list', (req, res) => {
  res.send({
    code: 200,
    data: foodData,
    message: '食物列表'
  })
})

app.listen(9000, () => {
  console.log('9000端口')
})