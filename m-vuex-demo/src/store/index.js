import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: []
  },
  mutations: {
    update(state, payload) {
      state.list = payload.list
      localStorage.setItem('list', JSON.stringify(payload.list))
    }
  },
  actions: {
  },
  modules: {
  }
})
