// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let { a, b } = event

  let sum = a * 1 + b * 1
  return {
    sum
  }
}