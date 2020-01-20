import { RouteConfig } from 'vue-router'
import Layout from '@/views/Layout.vue'
import Profile from '@/views/user/Profile.vue'
import Setting from '@/views/user/Setting.vue'

const userRouter: RouteConfig = {
  path: '/user',
  name: 'user',
  component: Layout,
  children: [
    {
      path: 'profile',
      name: 'profile',
      component: Profile
    },
    {
      path: 'setting',
      name: 'setting',
      component: Setting
    }
  ]
}

export default userRouter
