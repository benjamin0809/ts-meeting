<template>
  <div id="layout">
    <app-header v-if="user.Id && $route.path !== '/login'" /> 
    <el-main>
      <transition 
      name="fade-transform"
      mode="out-in">
        <router-view />
      </transition>
    </el-main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AppHeader from '@/components/Header.vue'
import AppFooter from '@/components/Footer.vue'
import Component from 'vue-class-component'
import { IUserInfo } from '@/models'
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'
const someModule = namespace('path/to/module')
@Component({
  components: {
    AppFooter,
    AppHeader
  },
  name: 'layout'
})
export default class Layout extends Vue {
  @State private user!: IUserInfo
  created() {
    console.log(this.user)
  }
}
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body{
  margin: 0;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.el-main {
  padding-top: 60px !important;
  position: relative;
}

</style>
