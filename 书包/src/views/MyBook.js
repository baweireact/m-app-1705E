import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

class MyBook extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: [],
      selectAll: false
    }
  }

  //选中某一本书，或者取消选中
  handleSelect(id, e) {
    let { selected } = this.state
    let { bookList } = this.props

    //打钩
    if (e.target.checked) {
      selected.push(id)
    } else { //取消
      let index = selected.findIndex(item => item === id)
      selected.splice(index, 1)
    }

    console.log(selected)
    this.setState({
      selected,
      selectAll: bookList.length === selected.length  //和全选按钮联动
    })
  }

  //全选，包括联动
  handleSelectAll(e) {
    let { bookList } = this.props
    let selectedNew
    if (e.target.checked) {
      selectedNew = bookList.map(item => item.id)
    } else {
      selectedNew = []
    }

    this.setState({
      selectAll: e.target.checked,
      selected: selectedNew
    })
  }

  //删除多个
  handleDeleteSelected() {
    let { selected } = this.state
    axios({
      url: '/api/delete',
      data: {
        ids: selected
      },
      method: 'post'
    }).then(res => {
      if (res.data.code === 200) {
        this.props.setState('bookList', res.data.data)
      }
    })
  }

  //删除单个
  handleDelete(ids) {
    axios({
      url: '/api/delete',
      data: {
        ids
      },
      method: 'post'
    }).then(res => {
      if (res.data.code === 200) {
        this.props.setState('bookList', res.data.data)
      }
    })
  }

  //挂载，从接口里获取书包的数据，然后放到redux里
  componentDidMount() {
    axios({
      url: '/api/get_book_list'
    }).then(res => {
      if (res.data.code === 200) {
        this.props.setState('bookList', res.data.data)
      }
    })
  }
  
  render() {
    let { selected, selectAll } = this.state
    let { bookList } = this.props
    const bookListDom = bookList.map(item => (
      <div key={item.id}>
        <input type="checkbox" checked={ selected.findIndex(selectItem => selectItem === item.id) >= 0 ? true : false }  onChange={this.handleSelect.bind(this, item.id)}></input>
        {item.title}
        <button onClick={this.handleDelete.bind(this, [item.id])}>删除</button></div>
    )) 
    return (
      <div>
        <input type="checkbox" checked={selectAll} onChange={this.handleSelectAll.bind(this)} ></input> 全选
        <button onClick={this.handleDeleteSelected.bind(this)}>删除选中的</button>
        {bookListDom}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(MyBook)
