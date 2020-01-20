import SysAdmin from '@/views/sysadmin/Index.vue'
import Notice from '@/views/sysadmin/Notice.vue'
import RoleManage from '@/views/sysadmin/RoleManage.vue'
import Room from '@/views/room/Room.vue'
import Site from '@/views/room/Site.vue'
import Index from '@/views/room/Index.vue'
import Layout from '@/views/Layout.vue'
import { RouteConfig } from 'vue-router'
export const asyncRouter: RouteConfig[] = [
  {
    path: '/sysadmin',
    name: 'sysadmin',
    component: Layout,
    children: [
      {
        path: 'notice',
        name: 'notice',
        component: Notice
      },
      {
        path: 'user',
        name: 'users',
        component: () =>
          import(
            /* webpackChunkName: "about" */ '@/views/sysadmin/UserManage.vue'
          )
      },
      {
        path: 'role',
        name: 'role',
        component: RoleManage
      },
      {
        path: '*',
        redirect: 'users'
      }
    ]
  },
  {
    path: '/room',
    name: 'room',
    component: Layout,
    children: [
      {
        path: 'site',
        name: 'site',
        component: Site
      },
      {
        path: 'manage',
        name: 'manage',
        component: Room
      },
      {
        path: '*',
        redirect: 'site'
      }
    ]
  }
]
