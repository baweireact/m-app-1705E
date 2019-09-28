import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    setCount(state, payload) {
      state.count = payload.count
    }
  },
  actions: {
    getCount({ commit }) {
      axios({
        url: '/api/get_count'
      }).then(res => {
        if (res.data.code === 200) {
          commit({ type: 'setCount', count: res.data.data })
        }
      })
    },
    updateCount({ commit }, payload) {
      axios({
        url: '/api/update_count',
        data: {
          newCount: payload.count
        },
        method: 'post'
      }).then(res => {
        if (res.data.code === 200) {
          commit({ type: 'setCount', count: res.data.data })
        }
      })
    }
  }
})
