// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import i18n from './utils/i18n'
import Vuex from 'vuex'
import SvgIcon from 'vue-svgicon'
import '@/icons/components'
import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/style/index.scss'
import store from './store'
import Cookie from 'js-cookie'

// 全局導入dhtmlx-scheduler 樣式表
// import 'dhtmlx-scheduler/codebase/dhtmlxscheduler.css'

Cookie.set('name', 'benjamin')
Cookie.set('json', { name: 'benjamin' })

console.log(Cookie.get('json'))
console.log(Cookie.getJSON('json'))
Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})

Vue.use(Vuex)

/* eslint-disable no-new */
// tslint:disable-next-line: no-unused-expression
new Vue({
  el: '#app',
  store,
  router,
  i18n,
  components: { App },
  render: h => h(App)
})
