import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

class MyBook extends Component {

  componentDidMount() {
    axios({
      url: '/api/get_my_book'
    }).then(res => {
      if (res.data.code === 200) {
        this.props.onSetState('myBook', res.data.data)
      }
    })
  }

  render() {
    let { myBook } = this.props

    let myBookDom = myBook.map(item => (
      <div key={item.id}>{item.title}</div>
    ))

    return (
      <div>
        {myBookDom}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    myBook: state.myBook
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSetState(key, value) {
      dispatch({ type: 'SET_STATE', key, value })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyBook)
