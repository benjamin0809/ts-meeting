import { RouteConfig } from 'vue-router'
import Layout from '@/views/Layout.vue'
import Scheduler from '@/views/Scheduler.vue'
const homeRouter: RouteConfig = {
  path: '/home',
  name: 'home',
  component: Layout,
  children: [
    {
      path: '*',
      name: 'default',
      component: Scheduler
    }
  ]
}

export default homeRouter
