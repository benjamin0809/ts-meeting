<template>
  <el-header>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
    <el-submenu index="4">
        <template slot="title">{{$t('language')}}</template>
        <el-menu-item :index="item.code" v-for="item in languages" :key="item.code">{{item.lang}}</el-menu-item>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">{{user.UserNo}}</template>
        <el-menu-item index="3-1">个人信息</el-menu-item>
        <el-menu-item index="3-2">设置</el-menu-item>

        <el-menu-item index="/login">退出</el-menu-item>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">{{$t('menu.sysadmin')}}</template>
        <el-menu-item index="/sysadmin/notice">公告管理</el-menu-item>
        <el-menu-item index="/sysadmin/user">用戶管理</el-menu-item>
        <el-menu-item index="/sysadmin/role">角色管理</el-menu-item>
        <!-- <el-submenu index="2-4">
          <template slot="title">F2846595</template>
          <el-menu-item index="2-4-1">item one</el-menu-item>
          <el-menu-item index="2-4-2">item two</el-menu-item>
          <el-menu-item index="2-4-3">退出</el-menu-item>
        </el-submenu>-->
      </el-submenu>

      <!-- <el-menu-item index="3" disabled>Info</el-menu-item> -->
      <el-submenu index="1">
        <template slot="title">会议室</template>
        <el-menu-item index="/room/site">厂区管理</el-menu-item>
        <el-menu-item index="/room/manage">会议室管理</el-menu-item>
      </el-submenu>

      <el-menu-item index="/scheduler">Home</el-menu-item>
    </el-menu>
  </el-header>
</template>
 
<script  lang='ts'>
import Vue from 'vue'
import { LANGUAGES } from '@/constant'
import { IUserInfo } from '@/models'
import Component from 'vue-class-component'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
@Component
export default class Header extends Vue {
  languages = LANGUAGES
  activeIndex = '1'
  activeIndex2 = '1'
  @State private user!: IUserInfo
  handleSelect (key: string, keyPath: any) {

    if (LANGUAGES.some(p => p.code === key)) {
      this.selectLanguage(key)
    } else {
      if (key === '/login') {
        this.$store.dispatch('logout').catch(err => {
          console.error(err)
        })
      } this.$router.push(key).catch(() => {
            // console.error(err)
      })
    }
    console.log(key, keyPath)
  }

  selectLanguage (lang: string) {
    this.$i18n.locale = lang
    localStorage.setItem('lang', lang)
  }
}
</script>

<style lang="scss" scope>
.el-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 !important;
}
.el-menu--horizontal > .el-menu-item,
.el-menu--horizontal > .el-submenu {
  float: right !important;
}
</style>
