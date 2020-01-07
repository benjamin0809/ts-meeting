import Vue from 'vue'
import Vuex from 'vuex'
import { IUserInfo } from '@/models'
import { ISchedulerOptions } from '@/models/scheduler'
export interface IRootState {
  user: IUserInfo,
  schedulerState: ISchedulerOptions
}
Vue.use(Vuex)

export default new Vuex.Store<IRootState>({})
