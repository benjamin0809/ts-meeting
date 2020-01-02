<template>
  <div id="app">
    <app-header v-if="user.Id"></app-header>
    <el-main>
      <transition name="slide-fade">
        <router-view />
      </transition>
    </el-main>
    <app-footer></app-footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AppHeader from './components/Header.vue'
import AppFooter from './components/Footer.vue'
import Component from 'vue-class-component'
import { IUserInfo } from './models'
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
  }
})
export default class App extends Vue {

  @State private user!: IUserInfo
  created () {
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
  margin-top: 60px;
}
</style>
