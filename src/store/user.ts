import { IUserInfo } from './../models/user'
import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from './index'
import { login } from '@/api/login'
import { DesHelper } from '@/utils/des'
import { SCERET } from '@/constant'
import { Message } from 'element-ui'

const user = localStorage.getItem('user')
let initVal: IUserInfo = {
  UserName: '',
  UserNo: '',
  Token: '',
  Email: '',
  Id: 0
}
if (typeof user === 'string') {
  initVal = JSON.parse(user)
}
console.log('initVal', initVal)

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserInfo {
  public UserName = initVal.UserName
  public UserNo = initVal.UserNo
  public Token = initVal.Token
  public Email = initVal.Email
  public Id = initVal.Id

  @Mutation
  SET_NAME(userName: string) {
    this.UserName = userName
  }

  @Mutation
  SET_TOKEN(Token: string) {
    this.Token = Token
  }

  @Mutation
  SET_USERNO(userNo: string) {
    this.UserNo = userNo
  }

  @Mutation
  SET_EMAIL(Email: string) {
    this.UserNo = Email
  }

  @Mutation
  SET_ID(Id: number) {
    this.Id = Id
  }

  @Mutation
  LOGOUT() {
    localStorage.removeItem('user')
    this.UserName = ''
    this.Email = ''
    this.UserNo = ''
    this.Id = 0
    this.Token = ''
  }
  @Action
  public async login(userinfo: { account: string, password: string }) {
    try {
      const pwd = DesHelper.DesEncrypt(userinfo.password, SCERET)
      console.log(userinfo.account, pwd)
      const data = await login(userinfo.account, pwd)

      const { Email, UserNo, UserName, Id, Token } = data
      localStorage.setItem('user', JSON.stringify(data))
      this.SET_EMAIL(Email)
      this.SET_USERNO(UserNo)
      this.SET_NAME(UserName)
      this.SET_ID(Id)
      this.SET_TOKEN(Token)
    } catch (e) {
      let msg = 'Has Error'
      switch (e.Errcode) {
        case 6120: msg = '密码不正确'
          break
        case 6101: msg = '账号不存在'
          break
      }
      Message.error(msg)
      throw new Error(e)
    }
  }

  @Action
  logout() {
    this.LOGOUT()
  }
}

export const moduleUser = getModule(User)
