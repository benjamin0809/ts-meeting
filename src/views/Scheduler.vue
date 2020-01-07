<template>
  <div>
    <!-- 会议室预定dialog -->
    <el-dialog title="会议室预定" :visible.sync="dialogVisible" :before-close="handleClose">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="会议主题" prop="subject">
          <el-input v-model="form.subject"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="form.remark"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="contact">
          <el-input v-model="form.contact"></el-input>
        </el-form-item>
        <el-form-item label="会议时间">
          <el-col :span="7">
            <el-form-item prop="date">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.date"
                style="width: 100%;"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="7">
            <el-form-item prop="start">
              <!--               <el-time-picker placeholder="开始时间" v-model="form.start" style="width: 100%;"></el-time-picker> -->
              <el-time-select
                placeholder="开始时间"
                v-model="form.start"
                :picker-options="{start: '08:30',step: '00:30',end: '21:00'}"
              ></el-time-select>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="7">
            <el-form-item prop="end">
              <!--               <el-time-picker placeholder="结束时间" v-model="form.end" style="width: 100%;"></el-time-picker> -->
              <el-time-select
                placeholder="结束时间"
                v-model="form.end"
                :picker-options="{start: '08:30',step: '00:30',end: '21:00',minTime: form.start}"
              ></el-time-select>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog">取 消</el-button>
        <el-button @click="cancelBooking">删除</el-button>
        <el-button type="primary" @click="saveDialog('form')">保存</el-button>
      </span>
    </el-dialog>

    <!--公告通知  -->
    <div class="notice-container">
      <el-collapse>
        <el-collapse-item name="1" class="notice">
          <template slot="title">
            <i class="header-icon el-icon-s-promotion"></i>
            公告通知
          </template>
          <!--           <el-table ref="singleTable" :data="showNotices" style="width: 100%">
            <el-table-column type="index" width="30"></el-table-column>
            <el-table-column property="Content"></el-table-column>
          </el-table>-->

          <div v-for="(item, name, index) in showNotices" :key="index" >{{item.Content}}</div>
        </el-collapse-item>
      </el-collapse>
    </div>

    <!--scheduler组件  -->
    <div ref="container" class="widget-box dhx_cal_container">
      <div class="dhx_cal_navline">
        <div class="dhx_cal_prev_button">&nbsp;</div>
        <div class="dhx_cal_next_button">&nbsp;</div>
        <div class="dhx_cal_today_button"></div>
        <div class="dhx_cal_date"></div>
        <div class="dhx_cal_tab day_tab" name="day_tab"></div>
        <div class="dhx_cal_tab week_tab" name="week_tab"></div>
        <div class="dhx_cal_tab month_tab" name="month_tab"></div>
        <!--厂区/会议室选择 -->
        <div class="dhx_cal_tab site_tab" name="site_tab">
          <el-select v-model="siteValue" class="site_select" @change="siteChanged">
            <el-option
              v-for="item in siteOptions"
              :key="item.Code"
              :label="item.Name"
              :value="item.Code"
            ></el-option>
          </el-select>
        </div>
        <div class="dhx_cal_tab room_tab" name="room_tab">
          <el-select v-model="roomValue" class="room_select" @change="roomChanged">
            <el-option
              v-for="item in roomOptions"
              :key="item.RoomID"
              :label="item.RoomName"
              :value="item.RoomID"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="dhx_cal_header"></div>
      <div class="dhx_cal_data"></div>
    </div>
  </div>
</template>
<style lang="scss" scope>

.el-main {
  padding: 0 0 0 20px !important;
}
.widget-box {
  min-height: calc(100vh - 76px);
}
.el-dialog {
  min-width: 800px;
}
.site_tab {
  left: 0px !important;
}
.room_tab {
  left: 89px !important;
  width: 240px !important;
}
.day_tab {
  left: 350px !important;
}
.week_tab {
  left: 439px !important;
}
.month_tab {
  left: 528px !important;
}
.site_tab div {
  position: relative !important;
  top: 0px !important;
}
.room_tab div {
  position: relative !important;
  top: 0px !important;
}
.dhx_cal_tab .el-input__inner {
  background: transparent;
  border: none !important;
  height: 80% !important;
}

.notice .el-table__header-wrapper {
  height: 0px !important;
}

.notice div {
  text-align: left;
}
</style>
 
<script lang='ts'>
import Vue from 'vue'

import Component from 'vue-class-component'
import scheduler from '@/utils/scheduler'
import moment from 'moment'
import { Message } from 'element-ui'
import { moduleScheduler } from '@/store/scheduler'
import { getSites, getSiteRooms, getShedulerData, GetActiveRoom, GetSites, GetHomeData, GetMeetingRoomData, BookingRoom, UpdateBookingInfo, CancelBookingRoom } from '../api/room'
import { getShowNotices } from '../api/notice'
import { dateFormat } from '../utils/date'
import { IRoom, ISite, ISchedulerItem, IBookingRoomInput, IBookingRoomEntity, IUpdateBookingRoomEntity, IUpdateBookingRoomInput } from '../models'
import { ISchedulerOptions } from '../models/scheduler'

@Component
export default class Scheduler extends Vue {
  // 预定dialog
  dialogVisible = false
  form = {
    subject: '',
    remark: '',
    contact: '',
    date: '',
    start: '',
    end: '',
    room: '',
    hint: ''
  }

  // 暂存新增未保存的event id
  indexId = ''

  isloadingData = false
  schedulerData: ISchedulerItem[] = []
  schedulerOption: ISchedulerOptions = {
    type: moduleScheduler.type,
    RoomId: moduleScheduler.RoomId,
    Site: moduleScheduler.Site
  }
  // 获取首页公告通知
  showNotices = getShowNotices()
  // 获取site/room
  siteOptions: ISite[] = []
  siteValue = moduleScheduler.Site
  roomOptions: IRoom[] = []
  allRomOptions: IRoom[] = []
  roomValue = moduleScheduler.RoomId
  crrentDate = new Date()
  RecID = 0
  siteChanged () {
    // console.log(this.siteValue)
    // this.roomOptions = getSiteRooms(this.siteValue)
    this.roomOptions = this.allRomOptions.filter(p => p.Site === this.siteValue)
    this.roomValue =
      this.roomOptions.length > 0 ? this.roomOptions[0].RoomID : 0
    this.refreshScheduler()
    this.schedulerOption.Site = this.siteValue
    moduleScheduler.setSchedulerOptions(this.schedulerOption)
  }
  roomChanged () {
    moduleScheduler.CLEAR_MONTH()
    // debugger;
    moduleScheduler.setSchedulerOptions(this.schedulerOption)
    this.refreshScheduler()
  }

  // 刷新scheduler会议室预定数据
  async refreshScheduler () {
    console.log(this.roomValue)
    this.schedulerData = []
    await this.getMeetingRoomData(moment(this.crrentDate).format('YYYY-MM'))
  }

  async getMeetingRoomData (month: string) {
    try {
      this.isloadingData = true
      const data = await GetMeetingRoomData(this.roomValue, month)
      moduleScheduler.ADD_MONTH(month)
      const list: ISchedulerItem[] = []
      data.forEach((item) => {
        const schedulerItem: ISchedulerItem = {
          id : item.RecID,
          start_date: item.Start_Date,
          end_date: item.End_Date,
          text: item.Text,
          details: item.Remark,
          tel: item.Tel,
          memo: item.MeetingMemo
        }
        list.push(schedulerItem)
      })
      this.schedulerData.push(...list)
      this.renderSchedulerData()
    } catch (e) {
      return []
    } finally {
      this.isloadingData = false
    }
  }

  renderSchedulerData () {
    scheduler.clearAll()
    scheduler.parse(this.schedulerData, 'json')
    scheduler.updateView()
  }

  showDialog (id: string) {
    let item = this.schedulerData.find(m => m.id.toString() === id)
    const attachEvent = scheduler.getEvent(id)
    if (item !== undefined) {
      // 修改
      item = item as ISchedulerItem
      this.form.subject = item.memo
      this.form.remark = item.details
      this.form.contact = item.tel
      this.RecID = ~~id
    } else {
      // 新增
      this.indexId = id
    }
    const startDate = attachEvent.start_date
    const endDate = attachEvent.end_date
    this.form.date = dateFormat(startDate)
    this.form.start = dateFormat(startDate, 'HH:mm:ss')
    this.form.end = dateFormat(endDate, 'HH:mm:ss')
    this.dialogVisible = true
  }
  async mounted () {
    // console.log(scheduler)

    this.siteOptions = await GetSites()
    this.allRomOptions = await GetActiveRoom()
    this.siteValue = this.siteValue || this.siteOptions[0].Code
    this.roomValue = this.allRomOptions[0].RoomID
    this.siteChanged()
    // 数据初始化

    /* globals scheduler */
    scheduler.init(this.$refs.container, new Date(), 'week')
    scheduler.parse(this.schedulerData, 'json')

    scheduler.attachEvent('onDragEnd', (id: string) => {
      this.showDialog(id)
    })

    scheduler.templates.month_date_class = (date: any, today: any) => {
      const time = new Date(date).getTime()
      const from = time
      const to = time + 86400000
      const evs = scheduler.getEvents(from, to)
      return ''
    }
    scheduler._click.buttons.edit = (id: any) => {
      console.log('_click.buttons icon_edit', id)
      this.showDialog(id)
      // some_function(id)
    }

    scheduler._click.buttons.delete = (id: any) => {
      console.log('_click.buttons icon_delete', id)
      this.RecID = id
      this.cancelBooking()
      // some_function(id)
    }

    scheduler._click.buttons.details = (id: any) => {
      console.log('_click.buttons icon_details', id)
      this.showDialog(id)
      // some_function(id)
    }

    // scheduler.attachEvent('onBeforeLightbox', (id: string, ev: any) => {
    //   this.dialogVisible = true
    //   // any custom logic here
    //   console.log(id, ev)
    //   return false
    // })

    scheduler.attachEvent('onBeforeEventChanged', (ev: any, e: any, isNew: any, original: any) => {
      console.log(ev, e, isNew, original)
      // any custom logic here
      return isNew
    })

    scheduler.attachEvent('onBeforeDrag', (id: any, mode: any, e: any) => {
      // any custom logic here
      return id === null
    })

    scheduler.attachEvent('onViewChange', (newMode: string, newDate: any) => {
      console.log(newMode, newDate)
      this.crrentDate = newDate
      const startMonth = moment(newDate).format('YYYY-MM')
      const endMonth = moment(newDate).add(7, 'd').format('YYYY-MM')
      console.log(startMonth, endMonth)
      switch (newMode) {
        case 'day':
          break
        case 'week':
          if (!this.isloadingData) {
            if (!moduleScheduler.loadedDataMonths.some(m => m === startMonth)) {
              this.getMeetingRoomData(startMonth)
            }
            if (!moduleScheduler.loadedDataMonths.some(m => m === endMonth)) {
              this.getMeetingRoomData(endMonth)
            }
          }
          break
        case 'month':
          console.log(moment(newDate).add(7, 'd'))
          break
      }
    })
  }

  destroyed () {
    console.log('destroyed')
    moduleScheduler.CLEAR_MONTH()
  }
  handleClose (done: any) {
    this.$confirm('确认关闭？')
      .then(_ => {
        done()
        if (this.indexId !== '') {
          scheduler.deleteEvent(this.indexId)
          this.indexId = ''
        }
        // 清除dialog form
        (this.$refs['form'] as any).resetFields()
      })
      .catch(_ => {
        // console.error("關閉失敗");
      })
  }

  cancelDialog () {
    // 清除dialog form
    this.dialogVisible = false
    if (this.indexId !== '') {
      scheduler.deleteEvent(this.indexId)
      this.indexId = ''
    } else if (this.RecID) {
      // scheduler.setEvent(this.RecID, {
      //   start_date: this.form.date + ' ' + this.form.start,
      //   end_date:   this.form.date + ' ' + this.form.end
      // })
    }
    (this.$refs['form'] as any).resetFields()
  }

  cancelBooking () {
    this.$confirm('确认取消会议室预订？',{ type: 'warning' })
      .then(async () => {
        await CancelBookingRoom(this.RecID);
        // 清除dialog form
        (this.$refs['form'] as any).resetFields()
        this.schedulerData = []
        this.dialogVisible = false
        scheduler.render(new Date(this.crrentDate))
        await this.getMeetingRoomData(moment(this.crrentDate).format('YYYY-MM'))
      })
      .catch(_ => {
        // console.error("關閉失敗");
      })
  }

  // dialog form表单验证
  validateSubject (rule: any, value: any, callback: any) {
    if (value === '') {
      callback(new Error('Please input the subject'))
    } else {
      callback()
    }
  }
  validateContact (rule: any, value: any, callback: any) {
    if (value === '') {
      callback(new Error('Please input the contact'))
    } else {
      callback()
    }
  }

  validateDate (rule: any, value: any, callback: any) {
    if (this.form.date === null) {
      callback(new Error('Please input the date'))
    } else {
      let date = new Date(this.form.date)
      if (date.getTime() < Date.now()) {
        callback(new Error('会议日期不能是今天之前'))
      } else {
        callback()
      }
    }
  }
  validateStart (rule: any, value: any, callback: any) {
    if (this.form.start === null) {
      callback(new Error('Please input the start time'))
    } else {
      let start = new Date(this.form.start)
      let end = new Date(this.form.end)
      if (end.getTime() < start.getTime()) {
        callback(new Error('会议开始时间必须小于结束时间'))
      } else {
        callback()
      }
    }
  }
  validateEnd (rule: any, value: any, callback: any) {
    if (this.form.end === null) {
      callback(new Error('Please input the end time'))
    } else {
      let start = new Date(this.form.start)
      let end = new Date(this.form.end)
      if (end.getTime() < start.getTime()) {
        callback(new Error('会议开始时间必须小于结束时间'))
      } else {
        callback()
      }
    }
  }

  rules = {
    subject: [{ validator: this.validateSubject, trigger: 'blur' }],
    contact: [{ validator: this.validateContact, trigger: 'blur' }],
    date: [{ validator: this.validateDate, trigger: 'blur' }],
    start: [{ validator: this.validateStart, trigger: 'blur' }],
    end: [{ validator: this.validateEnd, trigger: 'blur' }]
  }

  // 保存 dialog form
  saveDialog (formName: string) {
    (this.$refs[formName] as any).validate(async (valid: boolean) => {
      if (valid) {

        const BookingEntity: IBookingRoomEntity = {
          MeetingMemo: this.form.subject,
          StartTime: this.form.date + ' ' + this.form.start,
          EndTime: this.form.date + ' ' + this.form.end,
          Remark: this.form.remark,
          Tel: this.form.contact,
          ExtString1 : '',
          RoomID: this.roomValue
        }

        if (this.indexId) {
          // 新增
          const input: IBookingRoomInput = {
            BookingEntity: BookingEntity
          }
          try {
            await BookingRoom(input)
            console.log('预订成功')
            moduleScheduler.CLEAR_MONTH()
            this.schedulerData = []
            scheduler.render(new Date(this.crrentDate))
            await this.getMeetingRoomData(moment(this.crrentDate).format('YYYY-MM'));
            // 清除dialog form
            (this.$refs['form'] as any).resetFields()
            this.dialogVisible = false
          } catch (err) {
            Message.error(err.Errmsg || 'Has Error')
            console.log('失败')
          }
        } else {
          // 修改
          const entity: IUpdateBookingRoomEntity = {
            RecID: this.RecID,
            ...BookingEntity
          }

          const input: IUpdateBookingRoomInput = {
            UpdateBookingEntity: entity
          }
          try {
            await UpdateBookingInfo(input)
            console.log('修改成功')
            moduleScheduler.CLEAR_MONTH()
            this.schedulerData = []
            scheduler.render(new Date(this.crrentDate))
            await this.getMeetingRoomData(moment(this.crrentDate).format('YYYY-MM'));
            // 清除dialog form
            (this.$refs['form'] as any).resetFields()
            this.dialogVisible = false
          } catch (err) {
            Message.error(err.Errmsg || 'Has Error')
            console.log('失败')
          }
        }
        // 存到数据库
        // ---------
      } else {
        console.log('error submit!!')
        return false
      }
    })
  }
}
</script>
