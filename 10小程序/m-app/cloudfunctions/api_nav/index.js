// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let nav = [
    {
      id: 0,
      title: '武侠'
    },
    {
      id: 1,
      title: '都市'
    },
    {
      id: 2,
      title: '科幻'
    }
  ]
  return {
    code: 200,
    data: nav,
    message: '导航'
  }
}