import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

class MyBook extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectAll: false
    }
  }

  handleSelect(index, e) {
    let { myBook } = this.props
    myBook[index].checked = e.target.checked
    const count = myBook.filter(item => item.checked).length
    this.setState({
      selectAll: count === myBook.length
    })

    this.props.onSetState('myBook', myBook)
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
    let { myBook } = this.props
    let ids = myBook.filter(item => item.checked).map(item => item.id)
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

  handleSelectAll(e) {
    let { myBook } = this.props
    this.setState({
      selectAll: e.target.checked
    })
    myBook.forEach(item => {
      item.checked = e.target.checked
    })
    this.props.onSetState('myBook', myBook)
  }

  handleAdd(index) {
    let { myBook } = this.props
    myBook[index].count = myBook[index].count + 1
    this.props.onSetState('myBook', myBook)
  }

  handleSub(index) {
    let { myBook } = this.props
    if (myBook[index].count > 1) {
      myBook[index].count = myBook[index].count - 1
      this.props.onSetState('myBook', myBook)
    }
  }

  total(myBook) {
    let totalPrice = 0, totalCount = 0
    myBook.filter(item => item.checked).forEach(item => {
      totalCount += item.count
      totalPrice += item.count * item.price
    })
    return {
      totalCount,
      totalPrice
    }
  }

  componentDidUpdate() {
    let { myBook } = this.props
    axios({
      url: '/api/update_my_book',
      data: {
        myBookNew: myBook
      },
      method: 'post'
    }).then(res => {
      if (res.data.code === 200) {
      }
    })
  }

  componentDidMount() {
    axios({
      url: '/api/get_my_book'
    }).then(res => {
      if (res.data.code === 200) {
        let myBook = res.data.data
        this.props.onSetState('myBook', myBook)
        const count = myBook.filter(item => item.checked).length
        this.setState({
          selectAll: count === myBook.length
        })
      }
    })
  }

  render() {
    let { myBook } = this.props
    let { selectAll } = this.state

    let myBookDom = myBook.map((item, index) => (
      <div key={item.id}>
        <input type="checkbox" checked={ item.checked } onChange={this.handleSelect.bind(this, index)}/>
        {item.title}，价格：{item.price}元<button onClick={this.handleSub.bind(this, index)}>-</button>{item.count}<button onClick={this.handleAdd.bind(this, index)}>+</button>
        <button onClick={this.handleDelete.bind(this, [item.id])}>删除</button>
      </div>
    ))

    let total = this.total(myBook)

    return (
      <div>
        <input type="checkbox" checked={selectAll} onChange={this.handleSelectAll.bind(this)}></input>全选
        <button onClick={this.handleDeleteMore.bind(this)}>删除</button>
        {myBookDom}
        <div>
          总价：{total.totalPrice}元,总数：{total.totalCount}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    myBook: state.myBook,
    a: [], //容错用的，可以是空数组，或空对象，删除这个加加减减将失效，原因未知！！！另一种解决办法是dispatch前深拷贝myBook
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
