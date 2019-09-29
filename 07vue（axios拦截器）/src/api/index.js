import axios from 'axios'
import url from './url'

axios.defaults.baseURL = 'http://localhost:3000'

axios.interceptors.request.use((config) => {
  config.headers.token = '666'
  return config
})

axios.interceptors.response.use((res) => {
  if (res.data.code === 200) {
    return res
  } else if (res.data.code === 400) {
    alert(res.data.message)
    return res
  } else if (res.data.code === 403) {
    window.location.href = '/login'
  }
})

const common = async (config) => {
  const response = await axios(config)
  return response
}

export default {
  getUser: () => common({ url: url.getUser })
}