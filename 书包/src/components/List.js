import React, { Component } from 'react'
import { connect } from  'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

class List extends Component {

  handleDetail(id) {
    this.props.history.push('/index/home/detail/' + id)
  }

  handleAdd(item) {
    let { bookList } = this.props
    bookList.push(item)
    this.props.setState('bookList', bookList)
    axios({
      url: '/api/add',
      data: {
        item
      },
      method: 'post'
    }).then(res => {
      if (res.data.code === 200) {

      }
    })
  }

  componentDidMount() {
    axios({
      url: '/api/list?id=0'
    }).then(res => {
      if (res.data.code === 200) {
        this.props.setState('currentList', res.data.data.list)
      }
    })
    axios({
      url: '/api/get_book_list'
    }).then(res => {
      if (res.data.code === 200) {
        this.props.setState('bookList', res.data.data)
      }
    })
  }
  render() {
    let { currentList, bookList } = this.props

    let currentListDom = currentList.map(item => (
      <div key={item.id}>
        {item.title}
        <button onClick={this.handleDetail.bind(this, item.id)}>详情</button>
        {
          bookList.find(book => book.id === item.id)
          ? <button>已收藏</button>
          : <button onClick={this.handleAdd.bind(this, item)}>收藏</button>
        }
      </div>
    ))

    // let currentListDom = []
    // for (let i = 0; i < currentList.length; i++) {
    //   currentListDom.push(<div key={currentList[i].id}>
    //     <img src={currentList[i].avatar} alt={currentList[i].title}></img>
    //     {currentList[i].title}</div>)
    // }

    return (
      <div>
        {currentListDom}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentList: state.currentList,
    bookList: state.bookList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setState(key, value) {
      dispatch({ type: 'SET_STATE', key, value })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(List))