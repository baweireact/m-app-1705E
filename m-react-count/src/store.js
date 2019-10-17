import { createStore } from 'redux'

const defaultState = {
  bookList: [],
  bookObj: {}
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
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