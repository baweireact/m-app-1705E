import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    handleAdd(state) {
      state.count++
    },
    handleSub(state) {
      state.count--
    },
    setCount(state, payload) {
      state.count = payload.count
    }
  },
  actions: {

  }
})
