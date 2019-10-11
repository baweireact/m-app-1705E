import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentIndex: 0,
    list: [],
    currentList: [],
    myCart: []
  },
  mutations: {
    setList(state, payload) {
      state.list = payload.list
      state.currentList = state.list[0].spuList
    },
    setIndex(state, payload) {
      state.currentIndex = payload.index
      state.currentList = state.list[payload.index].spuList
    },
    setMyCart(state, payload) {
      state.myCart = payload.myCart
      localStorage.setItem('myCart', JSON.stringify(payload.myCart))
    }
  },
  actions: {
    getData({commit}) {
      axios({
        url: '/api/list'
      }).then(res => {
        if (res.data.code === 200) {
          commit({ type: 'setList', list: res.data.data })
        }
      })
    }
  }
})
