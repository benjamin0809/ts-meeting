
import Vue from 'vue'
import Router, { Route } from 'vue-router'
import Scheduler from '@/views/Scheduler.vue'
import Login from '@/views/Login.vue'
import SysAdmin from '@/views/sysadmin/Index.vue'
import Notice from '@/views/sysadmin/Notice.vue'
import RoleManage from '@/views/sysadmin/RoleManage.vue'
import UserManage from '@/views/sysadmin/UserManage.vue'
import store from '../store'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/sysadmin',
      name: 'sysadmin',
      component: SysAdmin,
      children: [{
        path: 'notice',
        name: 'notice',
        component: Notice
      },
        {
          path: 'user',
          name: 'user',
          component:  () => import(/* webpackChunkName: "about" */ '@/views/sysadmin/UserManage.vue')
        },
        {
          path: 'role',
          name: 'role',
          component: RoleManage
        }]
    },
    {
      path: '/scheduler',
      name: 'scheduler',
      component: Scheduler
    }, {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
router.beforeEach((to: Route, from: Route, next: any) => {
  // ...判断session是否过期
  // debugger

  if (store.state.isLogin || to.name === 'login') {
    next()
  } else {
    next(`/login?redirect=${to.path}`)
  }
})
export default router
