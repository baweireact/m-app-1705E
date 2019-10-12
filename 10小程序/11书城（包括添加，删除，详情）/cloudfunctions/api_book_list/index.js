// 云函数入口文件
const cloud = require('wx-server-sdk')
const { bookMallData } = require('./data.js')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let { id } = event
  let list = bookMallData.find(item => item.id == id).list
  let myBook = await cloud.database().collection('myBook').get()
  console.log('数据库：', myBook)
  myBook = myBook.data
  list.forEach(item => {
    if (myBook.find(book => book.id === item.id)) {
      item.is_in_my_book = true
    } else {
      item.is_in_my_book = false
    }
  })

  return {
    code: 200,
    data: list,
    message: '列表'
  }
}