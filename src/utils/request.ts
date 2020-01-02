import { moduleUser } from '@/store/user'
import axios from 'axios'

axios.defaults.headers.accept = '*'

// import { BASE_URL } from '../../config/index'
const instance = axios.create({
  baseURL: 'http://localhost:25035/api/',
  withCredentials: true, // 带上Cookie
  timeout: 200000,
  headers: {
    common: {
      Accept: 'application/json, text/plain, Authorization, */*'
    }
  }
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json'
    if (moduleUser.Token) {
      config.headers['Authorization'] = 'Bearer ' + moduleUser.Token
    }
    // 在发送请求之前做些什么
    config.data = Object.assign({ lang: 'zh-CN' }, config.data)
    // debugger
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    if (response.data && response.data.Errcode === 0) {
      return response.data.Result
    } else {
      return Promise.reject(response.data.Errmsg)
    }

  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default instance
