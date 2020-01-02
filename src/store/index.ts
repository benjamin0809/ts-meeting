import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({

  state: {
    isLogin: !!sessionStorage.getItem('user')
  },

  getters: {
    getLoginStatus (state) {
      return state.isLogin
    }
  },

  mutations: {
    LOGIN (state, userid) {
      sessionStorage.setItem('user', userid)
      state.isLogin = true
    },
    LOGOUT (state) {
      state.isLogin = false
    }
  },

  actions: {
    login (context, userid) {
      context.commit('LOGIN', userid)
    },
    logout (context) {
      sessionStorage.removeItem('user')
      context.commit('LOGOUT')
    }
  }
})

export default store
