<template>
  <div>
    <!-- 会议室预定dialog -->
    <el-dialog title="会议室预定" :visible.sync="dialogVisible"  :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="会议主题">
          <el-input v-model="form.subject"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.remark"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.contact"></el-input>
        </el-form-item>
        <el-form-item label="会议时间">
          <el-col :span="7">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="7">
            <el-time-picker placeholder="开始时间" v-model="form.start" style="width: 100%;"></el-time-picker>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="7">
            <el-time-picker placeholder="结束时间" v-model="form.end" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <!-- 
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button @click="dialogVisible = false">删除</el-button>
        <el-button type="primary" @click="dialogVisible = false">保存</el-button>
      </span>
    </el-dialog>

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
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="dhx_cal_tab room_tab" name="room_tab">
          <el-select v-model="roomValue" class="room_select" @change="roomChanged">
            <el-option
              v-for="item in roomOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
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

.el-main{
  padding: 0 0 0 20px !important;
}
.widget-box {
   min-height: calc(100vh - 76px);
}
.el-dialog{
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
</style>
 
<script lang='ts'>
import 'dhtmlx-scheduler'
import Vue from 'vue'
import Component from 'vue-class-component'

import { getSites, getSiteRooms, getShedulerData, getRoom } from '../api/room'

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
    room: ''
  }
  schedulerItem = {
    id: '',
    start_date: '',
    end_date: '',
    text: '',
    details: ''
  }
  schedulerData: any = []

  // 获取site/room
  siteOptions = getSites()
  siteValue = this.siteOptions[0].value
  roomOptions = getSiteRooms(this.siteValue)
  roomValue = this.roomOptions.length > 0 ? this.roomOptions[0].value : ''
  siteChanged () {
    console.log(this.siteValue)
    this.roomOptions = getSiteRooms(this.siteValue)
    this.roomValue =
      this.roomOptions.length > 0 ? this.roomOptions[0].value : ''
  }

  // 刷新scheduler会议室预定数据
  roomChanged () {
    console.log(this.roomValue)
    this.schedulerData = []
    this.GetBookedRoom(this.roomValue)
    scheduler.parse(this.schedulerData, 'json')
    scheduler.updateView()
  }

  // 构造scheduler数据
  GetBookedRoom (room: string) {
    const data = getShedulerData(room)
    for (let item of data) {
      let schedulerItem = {
        id: item.id,
        start_date: item.date + ' ' + item.start,
        end_date: item.date + ' ' + item.end,
        text:
          '预定人：' +
          item.user +
          '</br>' +
          '主题：' +
          item.subject +
          '</br>' +
          '联系方式' +
          item.contact,
        details: item.remark
      }
      this.schedulerData.push(schedulerItem)
    }
  }

  mounted () {
    // console.log(scheduler)

    getRoom().then(res => {
      console.log(res)
    }).catch(err => {
      console.error(err)
    })
    // 数据初始化
    this.GetBookedRoom(this.roomValue)

    scheduler.config.first_hour = 8
    scheduler.config.last_hour = 19
    scheduler.config.hour_size_px = 80
    scheduler.config.time_step = 15
    scheduler.config.min_grid_size = 30
    scheduler.locale = {
      date: {
        month_full: [
          '1月',
          '2月',
          '3月',
          '4月',
          '5月',
          '6月',
          '7月',
          '8月',
          '9月',
          '10月',
          '11月',
          '12月'
        ],
        month_short: [
          '1月',
          '2月',
          '3月',
          '4月',
          '5月',
          '6月',
          '7月',
          '8月',
          '9月',
          '10月',
          '11月',
          '12月'
        ],
        day_full: [
          '星期日',
          '星期一',
          '星期二',
          '星期三',
          '星期四',
          '星期五',
          '星期六'
        ],
        day_short: ['日', '一', '二', '三', '四', '五', '六']
      },
      labels: {
        dhx_cal_today_button: '今天',
        day_tab: '日',
        week_tab: '周',
        month_tab: '月',
        unit_tab: '會議室地址',
        new_event: '會議室預訂',
        icon_save: '保存',
        icon_cancel: '取消',
        icon_details: '详细',
        icon_edit: '编辑',
        icon_delete: '删除',
        confirm_closing: '',
        confirm_deleting: '確實要刪除該會議室預訂嗎?',
        section_description: '會議室預訂'
      }
    }
    /* globals scheduler */
    scheduler.config.day_date = '%M %d日 %D'
    scheduler.config.default_date = '%Y年 %M %d日'
    scheduler.config.month_date = '%Y年 %M'
    scheduler.config.drag_lightbox = false
    scheduler.init(this.$refs.container, new Date(), 'week')
    scheduler.parse(this.schedulerData, 'json')
    scheduler.updateView()

    scheduler.attachEvent('onDragEnd', (id: string, ev: any) => {
      this.dialogVisible = true
      console.log(id, ev)
      return false
    })

    scheduler.attachEvent('onBeforeLightbox', (id: string) => {
      this.dialogVisible = true
      // any custom logic here
      console.log(id)
      return false
    })
  }

  handleClose (done: any) {
    this.$confirm('确认关闭？')
      .then(_ => {
        done()
      })
      .catch(_ => {
        console.error('關閉失敗')
      })
  }
}
</script>
