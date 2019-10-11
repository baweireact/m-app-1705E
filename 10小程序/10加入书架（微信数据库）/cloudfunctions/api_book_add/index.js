// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let { item } = event
  const db = cloud.database()
  const myBook = db.collection('myBook')
  await myBook.add({
    data: {
      item
    }
  })
  let data = await myBook.get()
  return {
    code: 200,
    data,
    message: '添加成功'
  }
}