import axios from 'axios'
import urls from './urls'

console.log(process)
if (process.env.NODE_ENV === 'development') {
  console.log('env', process.env.NODE_ENV)
  axios.defaults.baseURL = 'http://localhost:8001'
}


axios.interceptors.request.use((config) => {
  return config
})

axios.interceptors.response.use((res) => {
  if (res.data.code === 400) {
    alert(res.data.message)
  }
  return res
})

const common = async (config) => {
  let response = await axios(config)
  return response.data
}

export default {
  login: (data) => common({ url: urls.login, data, method: 'post' }),
  getNav: () => common({ url: urls.getNav }),
  getList: (url) => common({ url: urls.getList + url }),
  updateMyBook: (data) => common({ url: urls.updateMyBook, data, method: 'post' }),
  add:(data) => common({ url: urls.add, data, method: 'post' }),
  getMyBook: () => common({ url: urls.getMyBook }),
  getDetail: (url) => common({ url: urls.getDetail + url })
}