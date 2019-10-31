const domain = require('domain')

const d = domain.create()

let name = 'tom'


d.on('error', (error) => {
  console.log('上下文环境：', name)
  console.log('domain捕获到的异常信息：', error.stack)
})

d.run(() => {
  console.log(obj.name)
})

