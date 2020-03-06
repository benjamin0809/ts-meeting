import { moduleUser } from '@/store/user'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import router from '@/router'
import { IResponseResult } from '@/models/http'

// import { BASE_URL } from '../../config/index'
const instance = axios.create({
  baseURL: process.env.VUE_APP_API,
  withCredentials: false, // 带上Cookie
  timeout: 200000,
  headers: {
    common: {
      Accept: 'application/json, text/plain, Authorization, */*'
    }
  }
})
// instance.defaults.headers.get['Pragma'] = 'no-cache'
// instance.defaults.headers.get['Cache-Control'] = 'no-cache, no-store'

// 请求拦截器
instance.interceptors.request.use(
  function (config) {
    config.headers['Content-Type'] = 'application/json'
    if (moduleUser.Token) {
      config.headers['Authorization'] = 'Bearer ' + moduleUser.Token
    }
    // 在发送请求之前做些什么
    config.data = Object.assign({ lang: 'zh-CN' }, config.data)
    // debugger
    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  function(response) {
    // console.log(response)
    try {
      if (response.data && response.data.Errcode === 0) {
        return response
      } else {
        return Promise.reject(response.data)
      }
    } catch (e) {
      console.error(e)
      return Promise.reject(e)
    }
  },
  function (error) {
    // 对响应错误做点什么

    if (error.message === 'Network Error') {
      console.log('连接失败')
    } else if (error.response.status === 401) {
      moduleUser.logout()
      // tslint:disable-next-line: no-floating-promises
      router.replace({
        path: '/login?redirect=' + router.currentRoute.fullPath
      })
      location.reload()
    }
    return Promise.reject(error)
  }
)

class Request {
  static get<T>(url: string, config?: AxiosRequestConfig | undefined) {
    return new Promise<T>(function (resolve, reject) {
      instance.get<IResponseResult<T>>(url, config).then(function(res: AxiosResponse<IResponseResult<T>>) {
        resolve(res.data.Result)
      }).catch(function(err: IResponseResult<any>) {
        reject(err)
      })
    })
  }

  static getData<T>(url: string, data: any) {
    let config: AxiosRequestConfig = {}
    config.params = data
    return new Promise<T>(function (resolve, reject) {
      instance.get<IResponseResult<T>>(url, config).then(function(res: AxiosResponse<IResponseResult<T>>) {
        resolve(res.data.Result)
      }).catch(function(err: IResponseResult<any>) {
        reject(err)
      })
    })
  }

  static post<T>(url: string, data: any, config?: AxiosRequestConfig | undefined) {
    console.log('url:',url,',data:',data)
    return new Promise<T>(function(resolve, reject) {
      console.log('Promise:',Promise,'instance',instance)
      instance.post<IResponseResult<T>>(url, data, config).then(function (res: AxiosResponse<IResponseResult<T>>) {
        console.log('res:',res)
        resolve(res.data.Result)
      }).catch(function(err: any) {
        reject(err)
      })
    })
  }
}

export default Request
