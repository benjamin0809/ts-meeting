import { getUser } from './../utils/cookies'
import { moduleUser } from '@/store/user'
import Vue from 'vue'
import Router, { Route } from 'vue-router'
import Login from '@/views/Login.vue'
import Layout from '@/views/Layout.vue'
import userRouter from '@/router/modules/user'
import homeRouter from '@/router/modules/home'
import Scheduler from '@/views/Scheduler.vue'
import asyncRouter from './async'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { IUserInfo } from '@/models'
Vue.use(Router)

// console.log('router defined')
NProgress.configure({ showSpinner: false })
const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Layout,
      children: [
        {
          path: '/home',
          name: 'index',
          component: Scheduler
        }
      ]
    },
    {
      path: '/',
      redirect: '/home'
    },
    userRouter
  ]
})

router.beforeEach((to: Route, from: Route, next: any) => {
  NProgress.start()
  // console.log(moduleUser)
  // ...判断session是否过期

  if (to.name === 'login') {
    moduleUser.logout()
    next()
    return
  }
  // console.log(moduleUser.Roles)
  if (moduleUser.Roles.length === 0) {
    const user = getUser()
    // console.log('user', user)
    if (user) {
      let initVal: IUserInfo = user
      moduleUser.setUserInfo(initVal)
      // 是否需要添加路由，
      if (initVal.Roles.includes(2)) {
        if (router) {
          // 动态添加路由
          router.addRoutes(asyncRouter)
          // Hack: ensure addRoutes is complete
          // Set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        }
      } else {
        next()
      }
    } else {
      if (to.path === '/home') {
        next(`/login`)
      } else {
        next(`/login?redirect=${to.path}`)
      }
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
