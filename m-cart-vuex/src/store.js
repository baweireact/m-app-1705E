import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentIndex: 0,
    list: [],
    currentList: []
  },
  mutations: {
    setList(state, payload) {
      state.list = payload.list
      state.currentList = state.list[0].spuList
    },
    setIndex(state, payload) {
      state.currentIndex = payload.index
      state.currentList = state.list[payload.index].spuList
    }
  },
  actions: {
    getData({commit}) {
      axios({
        url: '/api/list'
      }).then(res => {
        if (res.data.code === 200) {
          commit({type: 'setList', list: res.data.data})
        }
      })
    }
  }
})
