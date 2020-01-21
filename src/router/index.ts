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
Vue.use(Router)

console.log('router defined')
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
  console.log(moduleUser)
  // ...判断session是否过期
  if (moduleUser.Id > 0 || to.name === 'login') {
    if (moduleUser.Roles.includes(2)) {
      // console.log('router', router)
      // router.addRoutes(asyncRouter)
    }
    next()
  } else {
    moduleUser.logout()
    next(`/login?redirect=${to.path}`)
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
