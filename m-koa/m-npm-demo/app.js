const fs = require('fs')
const request = require('request')
const program = require('commander')

program
  .option('-d, --down <url>', '下载')
  .parse(process.argv)

let url = program.down

const name = url.slice(url.lastIndexOf('/') + 1)
request(url).pipe(fs.createWriteStream('./' + name))

//请求一个接口
request('http://localhost:3000/api/nav', (error, response, body) => {
  console.log(error)
  //console.log(response)
  console.log('默认：', body)
})

//get请求
request.get('http://localhost:3000/api/nav', (error, res, body) => {
  console.log('get:', res.body)
})

//post请求
request({ 
  url: 'http://localhost:3000/api/login', 
  method: 'POST',
  json: true,
  headers: {
    "content-type": 'application/json'
  },  
  body: {username: 'admin', password: '123456'}
}, (error, res, body) => {
  console.log('get:', res.body)
})

//node app -d https://n3-q.mafengwo.net/s15/M00/16/18/CoUBGV2xnO6ALntcAB_DZLkVUnY568.png
//node app -d https://p4-q.mafengwo.net/s15/M00/B3/B1/CoUBGV2wYYmAAByNACD9lHJSPKY794.png
//node app --down https://n2-q.mafengwo.net/s15/M00/D0/E4/CoUBGV2vBYGAbzADAB1W_rqrlCM012.png

