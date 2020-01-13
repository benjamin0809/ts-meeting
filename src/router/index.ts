import { moduleUser } from '@/store/user'
import Vue from 'vue'
import Router, { Route } from 'vue-router'
import Scheduler from '@/views/Scheduler.vue'
import Login from '@/views/Login.vue'
import SysAdmin from '@/views/sysadmin/Index.vue'
import Notice from '@/views/sysadmin/Notice.vue'
import RoleManage from '@/views/sysadmin/RoleManage.vue'
import Room from '@/views/room/Room.vue'
import Site from '@/views/room/Site.vue'
import Index from '@/views/room/Index.vue'
import User from '@/views/user/Index.vue'
import Profile from '@/views/user/Profile.vue'
import Setting from '@/views/user/Setting.vue'
import UserManage from '@/views/sysadmin/UserManage.vue'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/sysadmin',
      name: 'sysadmin',
      component: SysAdmin,
      children: [
        {
          path: 'notice',
          name: 'notice',
          component: Notice
        },
        {
          path: 'user',
          name: 'user',
          component: () => import(/* webpackChunkName: "about" */ '@/views/sysadmin/UserManage.vue')
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
    },
    {
      path: '/room',
      name: 'room',
      component: Index,
      children: [
        {
          path: '/room/site',
          name: 'site',
          component: Site
        },
        {
          path: '/room/manage',
          name: 'manage',
          component: Room
        }
      ]
    }, {
      path: '/',
      name: 'default',
      redirect: '/scheduler'
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      children: [
        {
          path: '/user/profile',
          name: 'profile',
          component: Profile
        },
        {
          path: '/user/setting',
          name: 'setting',
          component: Setting
        }
      ]
    }
  ]
})
router.beforeEach((to: Route, from: Route, next: any) => {
  // ...判断session是否过期
  if (moduleUser.Id > 0 || to.name === 'login') {
    next()
  } else {
    next(`/login?redirect=${to.path}`)
  }
})
export default router
