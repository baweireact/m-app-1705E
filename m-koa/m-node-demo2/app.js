const http = require('http')
let wait = (mils) => {
  let now = Date.now()
  while (Date.now() - now <= mils);
}
const compute = () => {
  wait(1000)
  console.log(1)
  process.nextTick(compute)
}

const app = http.createServer((req, res) => {
  if (req.url === '/') {
    res.end('200')
  }
})

app.listen(3000)
console.log(3000)

// compute()