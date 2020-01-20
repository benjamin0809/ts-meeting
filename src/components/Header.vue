<template>
  <el-header>
    <el-menu
      :default-active="$route.path"
      class="el-menu-demo"
      mode="horizontal"
      text-color="#fff"
      background-color="#4b6580"
      active-text-color="#ffd04b"
      @select="handleSelect"
    >
    <el-dropdown trigger="click" @command="selectLanguage">
          <span class="el-dropdown-link">
          <svg-icon class="lang" name="language"/> 
          </span>
          <el-dropdown-menu slot="dropdown"  >
            <el-dropdown-item
            v-for="item in languages"
            :key="item.code"
            :command="item.code"
          >
          {{ item.lang }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      <!-- <el-submenu index="4">
        <template slot="title">
          {{ $t('language') }}
        </template>
        <el-menu-item
          v-for="item in languages"
          :key="item.code"
          :index="item.code"
        >
          {{ item.lang }}
        </el-menu-item>
      </el-submenu> -->

      <el-submenu index="3">
        <template slot="title">{{ user.UserNo }}</template>
        <el-menu-item index="/user/profile">{{
          $t('menu.userInfo')
        }}</el-menu-item>
        <el-menu-item index="/user/setting">{{
          $t('menu.setting')
        }}</el-menu-item>

        <el-menu-item index="/login">
          {{ $t('menu.exit') }}
        </el-menu-item>
      </el-submenu>

      <el-submenu index="2" v-if="user.Roles.includes(2)">
        <template slot="title">
          {{ $t('menu.sysadmin') }}
        </template>
        <el-menu-item index="/sysadmin/notice">
          {{ $t('menu.noticeManage') }}
        </el-menu-item>
        <el-menu-item index="/sysadmin/user">
          {{ $t('menu.userManage') }}
        </el-menu-item>
        <el-menu-item index="/sysadmin/role">
          {{ $t('menu.roleManage') }}
        </el-menu-item>
      </el-submenu>

      <el-submenu index="1" v-if="user.Roles.includes(2)">
        <template slot="title">
          {{ $t('menu.room') }}
        </template>
        <el-menu-item index="/room/site">
          {{ $t('menu.siteManage') }}
        </el-menu-item>
        <el-menu-item index="/room/manage">
          {{ $t('menu.roomManage') }}
        </el-menu-item>
      </el-submenu>

      <el-menu-item index="/home">
        {{ $t('menu.home') }}
      </el-menu-item>

      
       
    </el-menu>
    
  </el-header>
</template>

<script lang="ts">
import Vue from 'vue'
import { LANGUAGES } from '@/constant'
import { IUserInfo } from '@/models'
import Component from 'vue-class-component'
import { moduleUser } from '@/store/user'

import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
@Component
export default class Header extends Vue {
  @State private user!: IUserInfo
  languages = LANGUAGES
  handleSelect(key: string, keyPath: any) {
    if (key === '/login') {
      moduleUser.logout()
    }
    // console.log(this.$route.path)
    if (this.$route.path !== key) {
      this.$router.push(key).catch(err => {
        console.error(err)
      })
    }
   // console.log(key, keyPath)
  }

  selectLanguage(lang: string) {
    // this.$i18n.locale = lang
    localStorage.setItem('lang', lang)
    window.location.reload()
  }
}
</script>

<style lang="scss" scope>
.el-header {
  position: absolute;
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 !important;
}
.el-menu--horizontal > .el-menu-item,
.el-menu--horizontal > .el-submenu {
  float: right !important;
}
.lang{
  width: 1.2em !important;
  height: 1.2em !important;
  fill: #ffffff;
  vertical-align: text-bottom;
}

.el-dropdown{
  float: right;
  margin-right: 24px;
  line-height: 60px;
}
</style>
