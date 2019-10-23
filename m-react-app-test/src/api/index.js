import axios from 'axios'
import urls from './url'
axios.defaults.baseURL = "http://localhost:8888"

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