// import 'dhtmlx-scheduler'
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler.js'
import 'dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_container_autoresize.js'
// import 'dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_minical.js'
// import 'dhtmlx-scheduler/codebase/locale/locale_cn.js'
// import 'dhtmlx-scheduler/codebase/locale/locale_en.js'
import { SCHEDULER_CN, SCHEDULER_TW, SCHEDULER_US } from '.././constant'

scheduler.config.first_hour = 8
scheduler.config.last_hour = 22
scheduler.config.hour_size_px = 66
scheduler.config.time_step = 15
scheduler.config.min_grid_size = 20
// scheduler.config.show_loading = true
scheduler.config.drag_lightbox = false
scheduler.config.drag_highlight = true

scheduler.config.displayed_event_color = '#DFEDF7'
scheduler.config.displayed_event_text_color = '#195D8A'
scheduler.config.highlight_displayed_event = true
scheduler.config.icons_select = [
  'icon_details',
  'icon_edit',
  'icon_delete'
]

// 多語言
const lang = localStorage.getItem('lang')
if (lang === 'zh-cn') {
  scheduler.config.day_date = '%M %d日 %D'
  scheduler.config.default_date = '%Y年 %M %d日'
  scheduler.config.month_date = '%Y年 %M'
  scheduler.locale = SCHEDULER_CN
} else if (lang === 'zh-tw') {
  scheduler.config.day_date = '%M %d日 %D'
  scheduler.config.default_date = '%Y年 %M %d日'
  scheduler.config.month_date = '%Y年 %M'
  scheduler.locale = SCHEDULER_TW
} else if (lang === 'en-us') {
  scheduler.config.day_date = '%M %d %D'
  scheduler.config.default_date = '%Y %M %d'
  scheduler.config.month_date = '%Y %M'
  scheduler.locale = SCHEDULER_US
} else {
  scheduler.config.day_date = '%M %d日 %D'
  scheduler.config.default_date = '%Y年 %M %d日'
  scheduler.config.month_date = '%Y年 %M'
  scheduler.locale = SCHEDULER_TW
}

export default scheduler
