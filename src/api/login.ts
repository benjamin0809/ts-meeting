import store from '../store'
import request from '../utils/request'
import { IUserInfo } from '@/models'

export const login = (account: string, pwd: string) => {
  return request.post<IUserInfo>('auth/login', {
    account: account,
    password: pwd
  })
}
export const userLogin = (account: string, password: string): Promise<IUserInfo> => {
  return new Promise((resolve, reject) => {
    if (!account) {
      reject(new Error('account is empty'))
      return
    }

    if (!password) {
      reject(new Error('password is empty'))
      return
    }
    // tslint:disable-next-line: no-floating-promises
    // store.dispatch('login', account)
    resolve({
      Email: '894306909@qq.com',
      UserNo: 'F2846595',
      UserName: 'Benjamin',
      Id: 123,
      Token: 'sdssdsd',
      Roles: [0, 1]
    })
  })
}
