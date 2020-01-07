// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import i18n from './utils/i18n'
import Vuex from 'vuex'
import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
// 全局導入dhtmlx-scheduler 樣式表
// import 'dhtmlx-scheduler/codebase/dhtmlxscheduler.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
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
