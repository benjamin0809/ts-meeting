import store from '../store'
import request from '../utils/request'

export const login = (account: string, pwd: string) => {
  return request.post('auth/login', {
    UserCode: account,
    Pwd: pwd
  })
}
export const userLogin = (account: string, password: string) => {
  return new Promise((resolve, reject) => {
    if (!account) {
      reject({
        result: false,
        msg: 'account is empty'
      })
      return
    }

    if (!password) {
      reject({
        result: false,
        msg: 'password is empty'
      })
      return
    }
    // tslint:disable-next-line: no-floating-promises
    store.dispatch('login', account)

    resolve({
      result: true,
      user: {
        id: account,
        name: account
      }
    })
  })

}
