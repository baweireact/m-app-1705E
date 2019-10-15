import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

class BookList extends Component {

  handleDetail(id) {
    this.props.history.push('/index/home/detail/' + id)
  }

  handleAdd(item) {
    if (!localStorage.getItem('username')) {
      this.props.history.push('/login')
    }
    axios({
      url: '/api/add_book',
      data: {
        item
      },
      method: 'post'
    }).then(res => {
      if (res.data.code === 200) {
        let { currentId } = this.props
        axios({
          url: `/api/get_list?id=${currentId}`
        }).then(res => {
          if (res.data.code === 200) {
            this.props.onSetState('contentList', res.data.data)
          }
        })
      }
    })
  }

  render() {
    let { contentList } = this.props

    let listDom = contentList.map(item => (
      <div key={item.id}>
        {item.title}<button onClick={this.handleDetail.bind(this, item.id)}>详情</button>
        <button onClick={this.handleAdd.bind(this, item)} className={'m-add-btn ' + (item.is_in_my_book ? "": 'active')}>收藏</button>
      </div>
    ))

    return (
      <div>
        {listDom}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    contentList: state.contentList,
    currentId: state.currentId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSetState(key, value) {
      dispatch({ type: 'SET_STATE', key, value })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BookList))
