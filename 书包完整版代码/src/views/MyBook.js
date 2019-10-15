import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

class MyBook extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: [],
      selectAll: false,
    }
  }

  handleSelected(id, e) {
    let { selected } = this.state
    let { myBook } = this.props
    console.log(id, e.target.checked)
    let index = selected.findIndex(item => item === id)
    if (e.target.checked) {
      selected.push(id)
    } else {
      selected.splice(index, 1)
    }
    this.setState({
      selected,
      selectAll: selected.length === myBook.length
    })
  }

  handleDelete(ids) {
    axios({
      url: '/api/delete_book',
      data: {
        ids
      },
      method: 'post'
    }).then(res => {
      if (res.data.code === 200) {
        this.props.onSetState('myBook', res.data.data)
      }
    })
  }

  handleDeleteMore() {
    let { selected } = this.state
    axios({
      url: '/api/delete_book',
      data: {
        ids: selected
      },
      method: 'post'
    }).then(res => {
      if (res.data.code === 200) {
        this.props.onSetState('myBook', res.data.data)
      }
    })
  }

  handleSelectAll(e) {
    let { myBook } = this.props
    this.setState({
      selectAll: e.target.checked
    })
    if (e.target.checked) {
      let selected = myBook.map(item => item.id)
      this.setState({
        selected
      })
    } else {
      this.setState({
        selected: []
      })
    }
  }

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
    let { selected, selectAll } = this.state

    let myBookDom = myBook.map(item => (
      <div key={item.id}>
        <input type="checkbox" checked={ selected.findIndex(id => id === item.id) >= 0 ? true : false } onChange={this.handleSelected.bind(this, item.id)}/>
        {item.title}
        <button onClick={this.handleDelete.bind(this, [item.id])}>删除</button>
      </div>
    ))

    return (
      <div>
        <input type="checkbox" checked={selectAll} onChange={this.handleSelectAll.bind(this)}></input>全选
        <button onClick={this.handleDeleteMore.bind(this)}>删除</button>
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
