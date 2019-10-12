// 云函数入口文件
const cloud = require('wx-server-sdk')
const { bookMallData } = require('./data.js')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let { id } = event
  let data = []
  bookMallData.forEach(item => {
    item.list.forEach(book => {
      if (book.id == id) {
        data = book
      }
    })
  })
  return {
    code: 200,
    data,
    message: '详情'
  }
}