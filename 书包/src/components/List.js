import React, { Component } from 'react'
import { connect } from  'react-redux'
import { withRouter } from 'react-router-dom'
import Api from '../api'

class List extends Component {

  handleDetail(id) {
    this.props.history.push('/index/home/detail/' + id)
  }

  handleAdd(item) {
    if (!localStorage.getItem('username')) {
      this.props.history.push('/login')
      return;
    }
    let { bookList } = this.props
    item.checked = true
    item.count = 1
    bookList.push(item)
    this.props.setState('bookList', bookList)
    Api.add({item}).then(res => {
      if (res.data.code === 200) {

      }
    })
  }

  componentDidMount() {
    Api.getList(`?id=0`).then(res => {
      if (res.data.code === 200) {
        this.props.setState('currentList', res.data.data.list)
      }
    })
    Api.getBookList().then(res => {
      if (res.data.code === 200) {
        this.props.setState('bookList', res.data.data)
      }
    })
  }
  render() {
    let { currentList, bookList } = this.props

    let currentListDom = currentList.map(item => (
      <div key={item.id}>
        {item.title},价格：{item.price}元
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