// import 'dhtmlx-scheduler'
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler.js'
import 'dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_container_autoresize.js'
scheduler.config.first_hour = 8
scheduler.config.last_hour = 22
scheduler.config.hour_size_px = 80
scheduler.config.time_step = 15
scheduler.config.min_grid_size = 20
scheduler.config.show_loading = true
scheduler.config.day_date = '%M %d日 %D'
scheduler.config.default_date = '%Y年 %M %d日'
scheduler.config.month_date = '%Y年 %M'
scheduler.config.drag_lightbox = false
scheduler.config.drag_highlight = true

scheduler.config.icons_select = [
  'icon_details',
  'icon_edit',
  'icon_delete'
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

export default scheduler
