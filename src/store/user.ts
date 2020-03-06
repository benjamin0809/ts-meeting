import { removeUser, setUser } from './../utils/cookies'

import { IUserInfo } from './../models/user'
import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from './index'
import { login, userLogin } from '@/api/login'
import { DesHelper } from '@/utils/des'
import { SCERET } from '@/constant'
import { Message } from 'element-ui'
import router from '@/router/index'
import asyncRouter from '@/router/async'

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserInfo {
  public UserName = ''
  public UserNo = ''
  public Token = ''
  public Email = ''
  public Id = 0
  public Roles: number[] = []

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
    this.Email = Email
  }

  @Mutation
  SET_ID(Id: number) {
    this.Id = Id
  }

  @Mutation
  SET_ROLE(RoleID: number[]) {
    this.Roles = RoleID
  }

  @Mutation
  LOGOUT() {
    // localStorage.removeItem('user')
    removeUser()
    this.UserName = ''
    this.Email = ''
    this.UserNo = ''
    this.Id = 0
    this.Token = ''
    this.Roles = [0]
  }
  @Action
  public async login(userinfo: { account: string, password: string }) {
    try {
      const pwd = DesHelper.DesEncrypt(userinfo.password, SCERET)
      // console.log(userinfo.account, pwd)
      const data = await login(userinfo.account, pwd)
      // console.log('login',data)
      const { Email, UserNo, UserName, Id, Token, Roles } = data
      setUser(data)
      this.SET_EMAIL(Email)
      this.SET_USERNO(UserNo)
      this.SET_NAME(UserName)
      this.SET_ID(Id)
      this.SET_TOKEN(Token)
      this.SET_ROLE(Roles)
      router.addRoutes(asyncRouter)
    } catch (e) {
      console.error(e)
      let msg = 'Has Error'
      switch (e.Errcode) {
        case 6120: msg = '密码不正确'
          break
        case 6101: msg = '账号不存在'
          break
        default:
          msg = msg + JSON.stringify(e)

      }
      Message.error(msg + JSON.stringify(e))
      throw new Error(e)
    }
  }

  @Action
  setUserInfo(data: IUserInfo) {
    const { Email, UserNo, UserName, Id, Token, Roles } = data
    this.SET_EMAIL(Email)
    this.SET_USERNO(UserNo)
    this.SET_NAME(UserName)
    this.SET_ID(Id)
    this.SET_TOKEN(Token)
    this.SET_ROLE(Roles)
  }

  @Action
  logout() {
    this.LOGOUT()
  }
}

export const moduleUser = getModule(User)
