import axios from 'axios'
import urls from './url'

const isDev = process.env.NODE_ENV === 'development';
if (isDev) {
  //axios.defaults.baseURL = "http://localhost:8888"   //可以调用koa的接口
  axios.defaults.baseURL = "http://localhost"   //可以调用使用node的http原生模块编写的接口
}

const common = async (config) => {
  const response = await axios(config)
  return response
}

export default {
  login: (data) => common({ url: urls.login, data, method: 'post' }),
  getNav: () => common({ url: urls.getNav }),
  getList: (id) => common({ url: urls.getList + id } ),
  add:(data) => common({ url: urls.add, data, method: 'post' }),
  getDetail: (url) => common({ url: urls.getDetail + url }),
  getBookList: () => common({url: urls.getBookList}),
  bookDelete: (data) => common({url: urls.bookDelete, data, method: 'post'}),
  bookUpdate: (data) => common({ url: urls.bookUpdate, data, method: 'post'})
}