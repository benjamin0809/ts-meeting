import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from './index'
import { ISchedulerOptions } from '@/models/scheduler'

const scheduler = localStorage.getItem('scheduler')

let initVal: ISchedulerOptions = {
  Site: 'LH',
  RoomId: 0,
  type: 'week'
}
if (typeof scheduler === 'string') {
  initVal = JSON.parse(scheduler)
}
console.log('initVal', initVal)

@Module({ dynamic: true, store, name: 'scheduler' })
class Scheduler extends VuexModule implements ISchedulerOptions {
  public Site = initVal.Site
  public RoomId = initVal.RoomId
  public type = initVal.type
  public loadedDataMonths: string[] = []

  @Mutation
  SET_SITE(Site: string) {
    this.Site = Site
  }

  @Mutation
  SET_ROOMID(RoomId: number) {
    this.RoomId = RoomId
  }

  @Mutation
  SET_TYPE(type: 'week' | 'month' | 'day') {
    this.type = type
  }

  @Mutation
  ADD_MONTH(month: string) {
    if (!this.loadedDataMonths.some(m => m === month)) {
      this.loadedDataMonths.push(month)
    }
  }

  @Mutation
  CLEAR_MONTH() {
    this.loadedDataMonths = []
  }

  @Action
  setSchedulerOptions(schedulerOptions: ISchedulerOptions) {
    this.SET_ROOMID(schedulerOptions.RoomId)
    this.SET_SITE(schedulerOptions.Site)
    this.SET_TYPE(schedulerOptions.type)
    localStorage.setItem('scheduler', JSON.stringify(schedulerOptions))
  }
}

export const moduleScheduler = getModule(Scheduler)
