// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import Vuex from 'vuex'
import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler_material.css' // 全局導入dhtmlx-scheduler 樣式表

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Vuex)

/* eslint-disable no-new */
// tslint:disable-next-line: no-unused-expression
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  render: h => h(App)
})
