import axios from 'axios'
// import { BASE_URL } from '../../config/index'
const instance = axios.create({
  baseURL: 'http://localhost:25035/api/',
  withCredentials: true, // 带上Cookie
  timeout: 200000
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json'
      // 在发送请求之前做些什么
    return config
  },
  (error) => {
      // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (config) => {
      // 对响应数据做点什么
    return config
  },
  (error) => {
      // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default instance
