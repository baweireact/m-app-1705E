import { createStore } from 'redux'

const defaultState = {
  navList: [],
  currentIndex: 0,
  currentId: 0
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    //这个case功能比较强大，可以改state里的所有字段，动态的key，动态value
    case 'SET_STATE':
      let newState = JSON.parse(JSON.stringify(state))
      newState[action.key] = action.value
      return newState
    default:
      return state
  }
}

const store = createStore(reducer)

export default store