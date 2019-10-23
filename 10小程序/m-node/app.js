const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const { foodData } = require('./data.js')

let myCart = []

//跨域
app.use(cors())
app.use(bodyParser.json())

app.get('/api/food_list', (req, res) => {
  let data = JSON.parse(JSON.stringify(foodData))
  data.forEach(item => {
    item.spuList.forEach(food => {
      let index = myCart.findIndex(cartFood => cartFood.spuId === food.spuId)
      if (index >= 0) {
        food.count = myCart[index].count
      } else {
        food.count = 0
      }
    })
  })

  res.send({
    code: 200,
    data,
    message: '食物列表'
  })
})

app.post('/api/update_my_cart', (req, res) => {
  let { newMyCart } = req.body
  myCart = newMyCart
  res.send({
    code: 200,
    data: myCart,
    message: '更新成功'
  })
})

app.get('/api/get_my_cart', (req, res) => {
  res.send({
    code: 200,
    data: myCart,
    message: '购物车'
  })
})

app.listen(9000, () => {
  console.log('9000端口')
})