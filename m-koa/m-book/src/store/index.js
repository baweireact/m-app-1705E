import Vue from 'vue'
import Vuex from 'vuex'
import Api from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    navList: [],
    currentList: [],
    currentId: 0,
    myBook: []
  },
  mutations: {
    setState(state, payload) {
      state[payload.key] = payload.value
    }
  },
  actions: {
    getNav({ commit }) {
      Api.getNav().then(res => {
        if (res.code === 200) {
          commit({ type: 'setState', key: 'navList', value: res.data })
        }
      })
    },
    getList({ commit, state }) {
      Api.getList(`?id=${state.currentId}`).then(res => {
        if (res.code === 200) {
          commit({ type: 'setState', key: 'currentList', value: res.data })
        }
      })
    },
    updateMyBook({ }, payload) {
      Api.updateMyBook({ myBookNew: payload.myBook }).then(res => {
        if (res.code === 200) {
        }
      })
    },
    getMyBook({ commit }) {
      Api.getMyBook().then(res => {
        if (res.code === 200) {
          commit({ type: 'setState', key: 'myBook', value: res.data })
        }
      })
    }
  },
  modules: {
  }
})
