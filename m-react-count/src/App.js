import React, { Component } from 'react'
import { connect } from 'react-redux'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      myCart: [],
      currentItem: {}
    }
  }

  handleAdd(index) {
    //let { myCart, currentItem } = this.state
    let { bookList, bookObj } = this.props

    // myCart[index].count = myCart[index].count + 1
    // currentItem.count = currentItem.count + 1

    bookList[index].count = bookList[index].count + 1
    // bookObj.count = bookObj.count + 1

    // this.setState({
    //   myCart,
    //   currentItem
    // })

    this.props.onSetState('bookList', bookList)
    //this.props.onSetState('bookObj', bookObj)
  }

  componentDidMount() {
    this.setState({
      myCart: [ { count: 0 } ],
      currentItem: { count: 0 }
    })

    this.props.onSetState('bookList', [ { count: 0 } ])
    this.props.onSetState('bookObj', { count: 0 })
  }

  render() {
    let  { myCart, currentItem } = this.state
    let { bookList, bookObj } = this.props

    let myCartDom = myCart.map((item, index) => (
      <div key={index}>
        {item.count}
      </div>
    ))

    let bookListDom = bookList.map((item, index) => (
      <div key={index}>
        {item.count}
      </div>
    ))

    return (
      <div>
        {myCartDom}, { currentItem.count }, { bookListDom }, { bookObj.count }
        <div>
          <button onClick={this.handleAdd.bind(this, 0)}>加</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    bookList: state.bookList,
    bookObj: state.bookObj
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSetState(key, value) {
      dispatch({ type: 'SET_STATE', key, value })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
