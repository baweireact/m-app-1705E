// 云函数入口文件
const cloud = require('wx-server-sdk')
const { navList } = require('./data.js')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return {
    code: 200,
    data: navList,
    message: '导航'
  }
}