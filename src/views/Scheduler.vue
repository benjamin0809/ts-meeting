<template>
  <div ref="container" 
  class="widget-box dhx_cal_container" >
    <div class="dhx_cal_navline">
      <div class="dhx_cal_prev_button">&nbsp;</div>
      <div class="dhx_cal_next_button">&nbsp;</div>
      <div class="dhx_cal_today_button"></div>
      <div class="dhx_cal_date"></div>
      <div class="dhx_cal_tab" name="day_tab" ></div>
      <div class="dhx_cal_tab" name="week_tab" ></div>
      <div class="dhx_cal_tab" name="month_tab" ></div>
    </div>
    <div class="dhx_cal_header"></div>
    <div class="dhx_cal_data"></div>
  </div>
</template>
<style lang="scss">
.widget-box {
  height: 100vh;
}
</style>
 
<script lang='ts'>
import 'dhtmlx-scheduler'
import Vue from 'vue'
import Component from 'vue-class-component'
@Component
export default class Scheduler extends Vue {
  mounted () {
    console.log(scheduler)
    const data = [
      {
        id: '2',
        start_date: '2017-05-24 00:00:00',
        end_date: '2017-06-08 00:00:00',
        text: 'French Open',
        details: 'Philippe-Chatrier Court\n Paris, FRA'
      },
      {
        id: '3',
        start_date: '2017-06-10 00:00:00',
        end_date: '2017-06-13 00:00:00',
        text: 'Aegon Championship',
        details: 'The Queens Club\n London, ENG'
      },
      {
        id: '4',
        start_date: '2017-06-21 00:00:00',
        end_date: '2017-07-05 00:00:00',
        text: 'Wimbledon',
        details: 'Wimbledon\n June 21, 2009 - July 5, 2009'
      },
      {
        id: '5',
        start_date: '2017-06-18 00:00:00',
        end_date: '2017-06-27 00:00:00',
        text: 'Indianapolis Tennis Championship',
        details: 'Indianapolis Tennis Center\n Indianapolis, IN'
      },
      {
        id: '8',
        start_date: '2017-06-27 00:00:00',
        end_date: '2017-06-02 00:00:00',
        text: 'Countrywide Classic Tennis',
        details: 'Los Angeles Tennis Center.\n Los Angeles, CA  '
      },
      {
        id: '7',
        start_date: '2017-06-11 00:00:00',
        end_date: '2017-06-18 00:00:00',
        text: 'ATP Master Tennis',
        details: 'La Caja Magica.\n Madrid, Spain'
      }
    ]

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
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12'
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
    // scheduler.config.xml_date='%Y-%m-%d %H:%i'
    scheduler.init(this.$refs.container, new Date(2017, 5, 1), 'month')
    scheduler.parse(data, 'json')
    scheduler.updateView()

    scheduler.attachEvent('onDragEnd', (id: string, ev: any) => {
      console.log(id, ev)
    })

    scheduler.attachEvent('onBeforeLightbox', (id: string) => {
      // any custom logic here
      console.log(id)
      return false
    })
  }
}
</script>
