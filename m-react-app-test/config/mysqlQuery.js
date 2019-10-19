const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'demo'
})

connection.connect((error) => {
  if (error) {
    console.log('失败', error)
  } else {
    console.log('成功')
  }
})

const query = (sql, callback) => {
  connection.query(sql, (error, result) => {
    callback(result)
  })
}

module.exports = {
  query
}