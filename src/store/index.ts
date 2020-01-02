import Vue from 'vue'
import Vuex from 'vuex'
import { IUserInfo } from '@/models'
export interface IRootState {
  user: IUserInfo
}
Vue.use(Vuex)

export default new Vuex.Store<IRootState>({})
