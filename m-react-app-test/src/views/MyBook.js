import React, { Component } from 'react'
import { connect } from 'react-redux'
import Api from '../api'

class MyBook extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectAll: false
    }
  }

  //选中某一本书，或者取消选中
  handleSelect(index, e) {
    let { bookList } = this.props
    bookList[index].checked = e.target.checked
    this.props.setState('bookList', bookList)

    let count = bookList.filter(item => item.checked).length
    this.setState({
      selectAll: bookList.length === count  //和全选按钮联动
    })
  }

  //全选，包括联动
  handleSelectAll(e) {
    let { bookList } = this.props

    bookList.forEach(item => {
      item.checked = e.target.checked
    })
    this.props.setState('bookList', bookList)
    this.setState({
      selectAll: e.target.checked
    })
  }

  //删除多个
  handleDeleteSelected() {
    let { bookList } = this.props
    let ids = bookList.filter(item => item.checked).map(item => item.id)
    Api.bookDelete({ids}).then(res => {
      if (res.data.code === 200) {
        this.props.setState('bookList', res.data.data)
      }
    })
  }

  //删除单个
  handleDelete(ids) {
    Api.bookDelete({ids}).then(res => {
      if (res.data.code === 200) {
        this.props.setState('bookList', res.data.data)
      }
    })
  }

  //加
  handleAdd(index) {
    let { bookList } = this.props
    bookList[index].count += 1
    let bookListNew = JSON.parse(JSON.stringify(bookList))
    this.props.setState('bookList', bookListNew)
  }

  //减
  handleSub(index) {
    let { bookList } = this.props
    if (bookList[index].count > 1) {
      bookList[index].count -= 1
      let bookListNew = JSON.parse(JSON.stringify(bookList))
      this.props.setState('bookList', bookListNew)
    }
  }

  //存到后端
  handleUpdateBookList() {
    let { bookList } = this.props
    Api.bookUpdate({bookListNew:bookList}).then(res => {

    })
  }

  //更新完成
  componentDidUpdate() {
    this.handleUpdateBookList()
  }

  //挂载，从接口里获取书包的数据，然后放到redux里
  componentDidMount() {
    Api.getBookList().then(res => {
      if (res.data.code === 200) {
        let bookList = res.data.data
        this.props.setState('bookList', bookList)
        let count = bookList.filter(item => item.checked).length
        this.setState({
          selectAll: bookList.length === count  //和全选按钮联动
        })
      }
    })
  }
  
  render() {
    let { selectAll } = this.state
    let { bookList } = this.props
    const bookListDom = bookList.map((item, index) => (
      <div key={item.id}>
        <input type="checkbox" checked={ item.checked }  onChange={this.handleSelect.bind(this, index)}></input>
        {item.title},价格：{item.price}元，<button onClick={this.handleSub.bind(this, index)}>-</button>{item.count}<button onClick={this.handleAdd.bind(this, index)}>+</button>
        <button onClick={this.handleDelete.bind(this, [item.id])}>删除</button></div>
    )) 

    let totalPrice = 0, totalCount = 0
    bookList.filter(item => item.checked).forEach(item => {
      totalCount += item.count
      totalPrice += item.count * item.price
    })
    console.log(11)
    return (
      <div>
        <input type="checkbox" checked={selectAll} onChange={this.handleSelectAll.bind(this)} ></input> 全选
        <button onClick={this.handleDeleteSelected.bind(this)}>删除选中的</button>
        {bookListDom}
        <div>总价：{totalPrice}元，总数：{totalCount}</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state.bookList)
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
