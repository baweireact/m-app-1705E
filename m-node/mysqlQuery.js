const mysql = require('mysql')

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'demo'
})

connection.connect((error) => {
  if (error) {
    console.log('失败')
  } else {
    console.log('成功')
  }
})

//使用回调函数返回查询结果
const query = (sql, callback) => {
  connection.query(sql, (error, results) => {
    if (error) {
      throw error
    } else {
      callback && callback(results)
    }
  })
}

//使用promise封装sql查询
const queryPromise = (sql) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

module.exports = {
  query,
  queryPromise
}