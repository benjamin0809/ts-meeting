<template>
  <div>
    <!-- 会议室预定dialog -->
    <el-dialog
      :title="$t('schedulerDialog.title')"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item
          :label="$t('schedulerDialog.subject')"
          prop="subject"
        >
          <el-input v-model="form.subject" />
        </el-form-item>
        <el-form-item
          :label="$t('schedulerDialog.remark')"
          prop="remark"
        >
          <el-input
            v-model="form.remark"
            type="textarea"
          />
        </el-form-item>
        <el-form-item
          :label="$t('schedulerDialog.contact')"
          prop="contact"
        >
          <el-input v-model="form.contact" />
        </el-form-item>
        <el-form-item :label="$t('schedulerDialog.meetingTime')">
          <el-col :span="7">
            <el-form-item prop="date">
              <el-date-picker
                v-model="form.date"
                type="date"
                :placeholder="$t('schedulerDialog.chooseDate')"
                style="width: 100%;"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
          </el-col>
          <el-col
            class="line"
            :span="2"
          >
            -
          </el-col>
          <el-col :span="7">
            <el-form-item prop="start">
              <!--               <el-time-picker placeholder="开始时间" v-model="form.start" style="width: 100%;"></el-time-picker> -->
              <el-time-select
                v-model="form.start"
                :placeholder="$t('schedulerDialog.startTime')"
                :picker-options="{start: '08:30',step: '00:30',end: '21:00'}"
              />
            </el-form-item>
          </el-col>
          <el-col
            class="line"
            :span="1"
          >
            -
          </el-col>
          <el-col :span="6">
            <el-form-item prop="end">
              <!--               <el-time-picker placeholder="结束时间" v-model="form.end" style="width: 100%;"></el-time-picker> -->
              <el-time-select
                v-model="form.end"
                :placeholder="$t('schedulerDialog.endTime')"
                :picker-options="{start: '08:30',step: '00:30',end: '21:00',minTime: form.start}"
              />
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancelDialog">{{ $t('schedulerDialog.cancel') }}</el-button>
        <el-button @click="cancelBooking">{{ $t('schedulerDialog.delete') }}</el-button>
        <el-button
          type="primary"
          @click="saveDialog('form')"
        >{{ $t('schedulerDialog.save') }}</el-button>
      </span>
    </el-dialog>

    <!--公告通知  -->
    <div class="notice-container">
      <el-collapse>
        <el-collapse-item
          name="1"
          class="notice"
        >
          <template slot="title">
            <i class="header-icon el-icon-s-promotion" />
            {{ $t('notice.notice') }}
          </template>
          <!--           <el-table ref="singleTable" :data="showNotices" style="width: 100%">
            <el-table-column type="index" width="30"></el-table-column>
            <el-table-column property="Content"></el-table-column>
          </el-table>-->

          <div
            v-for="(item, name, index) in showNotices"
            :key="index"
          >
            {{ item.Content }}
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>

    <!--scheduler组件  -->
    <div
      ref="container"
      class="widget-box dhx_cal_container"
    >
      <div class="dhx_cal_navline">
        <div class="dhx_cal_prev_button">
&nbsp;
        </div>
        <div class="dhx_cal_next_button">
&nbsp;
        </div>
        <div class="dhx_cal_today_button" />
        <div class="dhx_cal_date" />
        <div
          class="dhx_cal_tab day_tab"
          name="day_tab"
        />
        <div
          class="dhx_cal_tab week_tab"
          name="week_tab"
        />
        <div
          class="dhx_cal_tab month_tab"
          name="month_tab"
        />
        <!--厂区/会议室选择 -->
        <div
          class="dhx_cal_tab site_tab"
          name="site_tab"
        >
          <el-select
            v-model="siteValue"
            class="site_select"
            @change="siteChanged"
          >
            <el-option
              v-for="item in siteOptions"
              :key="item.Code"
              :label="item.Name"
              :value="item.Code"
            />
          </el-select>
        </div>
        <div
          class="dhx_cal_tab room_tab"
          name="room_tab"
        >
          <el-select
            v-model="roomValue"
            class="room_select"
            @change="roomChanged"
          >
            <el-option
              v-for="item in roomOptions"
              :key="item.RoomID"
              :label="item.RoomName"
              :value="item.RoomID"
            />
          </el-select>
        </div>
      </div>
      <div class="dhx_cal_header" />
      <div class="dhx_cal_data" />
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
import RoomApi from '@/api/room'
import AdminApi from '@/api/admin'
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
  showNotices = []
  // 获取site/room
  siteOptions: ISite[] = []
  siteValue = moduleScheduler.Site
  roomOptions: IRoom[] = []
  allRomOptions: IRoom[] = []
  roomValue = moduleScheduler.RoomId
  crrentDate = new Date()
  RecID = 0
  siteChanged() {
    // console.log(this.siteValue)
    // this.roomOptions = getSiteRooms(this.siteValue)
    this.roomOptions = this.allRomOptions.filter(p => p.Site === this.siteValue)
    this.roomValue =
      this.roomOptions.length > 0 ? this.roomOptions[0].RoomID : 0
    void this.refreshScheduler()
    this.schedulerOption.Site = this.siteValue
    moduleScheduler.setSchedulerOptions(this.schedulerOption)
  }
  roomChanged() {
    moduleScheduler.CLEAR_MONTH()
    // debugger;
    moduleScheduler.setSchedulerOptions(this.schedulerOption)
    void this.refreshScheduler()
  }

  // 刷新scheduler会议室预定数据
  async refreshScheduler() {
    console.log(this.roomValue)
    this.schedulerData = []
    await this.getMeetingRoomData(moment(this.crrentDate).format('YYYY-MM'))
  }

  async getMeetingRoomData(month: string) {
    try {
      this.isloadingData = true
      const data = await RoomApi.GetMeetingRoomData(this.roomValue, month)
      moduleScheduler.ADD_MONTH(month)
      const list: ISchedulerItem[] = []
      data.forEach((item) => {
        const schedulerItem: ISchedulerItem = {
          id: item.RecID,
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

  renderSchedulerData() {
    scheduler.clearAll()
    scheduler.parse(this.schedulerData, 'json')
    scheduler.updateView()
  }

  showDialog(id: string) {
    let item = this.schedulerData.find(m => m.id.toString() === id) as ISchedulerItem
    const attachEvent = scheduler.getEvent(id)
    this.dialogVisible = true
    if (item && item.id > 0) {
      // 修改
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

    console.log('showDialog time:', moment().format('HH:mm:ss'), 'form start: ', this.form.start, ',form end:', this.form.end)
  }
  async mounted() {
    const rooms = await RoomApi.GetHomeRoom()
    for (let item of rooms) {
      if (!this.siteOptions.some(x => x.CodeId === item.CodeId)) {
        this.siteOptions.push({
          CodeId: item.CodeId,
          Code: item.Code,
          Name: item.SiteName
        })
      }
      this.allRomOptions.push({
        RoomID: item.RoomID,
        RoomName: item.RoomName,
        Site: item.Code
      })
    }
    this.siteValue = this.siteValue || this.siteOptions[0].Code
    this.roomValue = this.allRomOptions[0].RoomID
    this.siteChanged()
    // 数据初始化

    /* globals scheduler */
    scheduler.init(this.$refs.container, new Date(), 'week')
    scheduler.parse(this.schedulerData, 'json')

    scheduler.attachEvent('onDragEnd', (id: string) => {
      console.log('onDragEnd showDialog id:', id)
      this.showDialog(id)
      return false
    })

    scheduler.templates.month_date_class = (date: any, today: any) => {
      const time = new Date(date).getTime()
      const from = time
      const to = time + 86400000
      const evs = scheduler.getEvents(from, to)
      return ''
    }
    scheduler._click.buttons.edit = (id: any) => {
      console.log('_click.buttons icon_edit showDialog id:', id)
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
      console.log('_click.buttons icon_details showDialog id:', id)
      this.showDialog(id)
      // some_function(id)
    }

    scheduler.attachEvent('onBeforeLightbox', (id: string, ev: any) => {
      // this.dialogVisible = true
      // any custom logic here
      console.log('onBeforeLightbox', id, ev)
      return false
    })

    scheduler.attachEvent('onDblClick', (id: any, e: any) => {
      console.log('onDblClick showDialog id:', id, e)
      // any custom logic here
      this.showDialog(id)
      return false
    })

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
      if (!this.isloadingData) {
        switch (newMode) {
          case 'day':
            if (!moduleScheduler.loadedDataMonths.some(m => m === startMonth)) {
              return this.getMeetingRoomData(startMonth)
            }
            break
          case 'week':
            if (!moduleScheduler.loadedDataMonths.some(m => m === startMonth)) {
              return this.getMeetingRoomData(startMonth)
            }
            if (!moduleScheduler.loadedDataMonths.some(m => m === endMonth)) {
              return this.getMeetingRoomData(endMonth)
            }
            break
          case 'month':
            if (!moduleScheduler.loadedDataMonths.some(m => m === startMonth)) {
              return this.getMeetingRoomData(startMonth)
            }
            break
        }
      }
    })
  }

  destroyed() {
    console.log('destroyed')
    moduleScheduler.CLEAR_MONTH()
  }
  handleClose(done: any) {
    this.$confirm(this.$t('schedulerDialog.closeHint').toString())
      .then(_ => {
        done()
        if (this.indexId !== '') {
          scheduler.deleteEvent(this.indexId)
          this.indexId = ''
        }
        this.RecID = 0;
        // 清除dialog form
        (this.$refs['form'] as any).clearValidate()
      })
      .catch(_ => {
        // console.error("關閉失敗");
      })
  }

  cancelDialog() {
    // 清除dialog form
    if (this.indexId !== '') {
      scheduler.deleteEvent(this.indexId)
      this.indexId = ''
    }
    this.RecID = 0;
    (this.$refs['form'] as any).clearValidate()
    this.dialogVisible = false
  }

  cancelBooking() {
    this.$confirm(this.$t('schedulerDialog.cancelHint').toString(), { type: 'warning' })
      .then(async() => {
        await RoomApi.CancelBookingRoom(this.RecID);
        // 清除dialog form
        (this.$refs['form'] as any).clearValidate()
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
  validateSubject(rule: any, value: any, callback: any) {
    if (value === '') {
      callback(new Error(this.$t('schedulerDialog.subjectHint').toString()))
    } else {
      callback()
    }
  }
  validateContact(rule: any, value: any, callback: any) {
    if (value === '') {
      callback(new Error(this.$t('schedulerDialog.contactHint').toString()))
    // } else if (/(^(\d{3,4}-)?\d{5,9})$|(1[3|5|7|8]\d{9})/.test(value)) {
    //   callback(new Error('联系方式格式不正确'))
    } else {
      callback()
    }
  }

  validateDate(rule: any, value: any, callback: any) {
    if (this.form.date === '') {
      callback(new Error(this.$t('schedulerDialog.dateInputHint').toString()))
    } else {
      if (moment(this.form.date).isBefore(moment(), 'day')) {
        callback(new Error(this.$t('schedulerDialog.dateValidHint').toString()))
      } else {
        callback()
      }
    }
  }
  validateStart(rule: any, value: any, callback: any) {
    if (this.form.start === '') {
      callback(new Error(this.$t('schedulerDialog.startHint').toString()))
    } else {
      let start = new Date(this.form.start)
      let end = new Date(this.form.end)
      if (end.getTime() < start.getTime()) {
        callback(new Error(this.$t('schedulerDialog.timeValidHint').toString()))
      } else {
        callback()
      }
    }
  }
  validateEnd(rule: any, value: any, callback: any) {
    if (this.form.end === '') {
      callback(new Error(this.$t('schedulerDialog.endHint').toString()))
    } else {
      let start = new Date(this.form.start)
      let end = new Date(this.form.end)
      if (end.getTime() < start.getTime()) {
        callback(new Error(this.$t('schedulerDialog.timeValidHint').toString()))
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
  saveDialog(formName: string) {
    (this.$refs[formName] as any).validate(async(valid: boolean) => {
      if (valid) {
        const BookingEntity: IBookingRoomEntity = {
          MeetingMemo: this.form.subject,
          StartTime: this.form.date + ' ' + this.form.start,
          EndTime: this.form.date + ' ' + this.form.end,
          Remark: this.form.remark,
          Tel: this.form.contact,
          ExtString1: '',
          RoomID: this.roomValue
        }

        if (this.indexId) {
          // 新增
          const input: IBookingRoomInput = {
            BookingEntity: BookingEntity
          }
          try {
            await RoomApi.BookingRoom(input)
            this.$message('预订成功')
            moduleScheduler.CLEAR_MONTH()
            this.schedulerData = []
            scheduler.render(new Date(this.crrentDate))
            await this.getMeetingRoomData(moment(this.crrentDate).format('YYYY-MM'));
            // 清除dialog form
            (this.$refs['form'] as any).clearValidate()
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
            await RoomApi.UpdateBookingInfo(input)
            this.$message('修改成功')
            moduleScheduler.CLEAR_MONTH()
            this.schedulerData = []
            scheduler.render(new Date(this.crrentDate));
            // await this.getMeetingRoomData(moment(this.crrentDate).format('YYYY-MM'));
            // 清除dialog form
            (this.$refs['form'] as any).clearValidate()
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
