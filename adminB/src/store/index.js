import Vue from 'vue'
import 'babel-polyfill'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'
import keepalive from './module/keepalive'
import untils from './module/untils'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contons: '0',
    formData: JSON.parse(sessionStorage.getItem('State')) || {}
  },
  mutations: {
    putCont (state, html) {
      state.contons = html
    },
    setformData (state, rep) {
      sessionStorage.setItem('State', JSON.stringify(rep))
      state.formData = rep
    }
  },
  actions: {

  },
  modules: {
    user,
    app,
    keepalive,
    untils,
  }
})
