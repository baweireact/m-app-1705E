import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import LazyLoad from 'react-lazy-load'
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
    Api.add({ item }).then(res => {
      if (res.data.code === 200) {

      }
    })
  }

  //挂载，刷新的时候会走这里
  componentDidMount() {
    //列表
    Api.getList(`?id=0`).then(res => {
      if (res.data.code === 200) {
        this.props.setState('currentList', res.data.data)
      }
    })

    //请求书包里的数据
    Api.getBookList().then(res => {
      if (res.data.code === 200) {
        this.props.setState('bookList', res.data.data)
      }
    })
    this.props.setState('currentIndex', 0)
  }
  render() {
    let { currentList, bookList } = this.props

    let currentListDom = currentList.map(item => (
      <div key={item.id} className="m-list-item">
        <LazyLoad height={150}>
          <img src={item.avatar} className="m-list-img"></img>
        </LazyLoad>
        <div className="m-list-info">
          <div className="m-list-title">{item.title}</div>
          <div className="m-list-price">¥ {item.price}</div>
          <div className="m-list-btn-wrap">
            <span className="m-book-detail-btn" onClick={this.handleDetail.bind(this, item.id)}>书籍详情</span>
            {
              bookList.find(book => book.id === item.id)
                ? <span className="m-book-disable-btn">已收藏</span>
                : <span className="m-book-detail-btn" onClick={this.handleAdd.bind(this, item)}>收藏</span>
            }
          </div>
        </div>
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