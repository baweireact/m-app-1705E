import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Api from '../api'

const Detail = (props) => {
  const [ detail, setDetail ] = useState({})

  const handleAdd = (item) => {
    let { bookList } = props
    let bookListClone = JSON.parse(JSON.stringify(bookList))
    item.checked = true
    item.count = 1
    bookListClone.push(item)
    props.setState('bookList', bookListClone)
    Api.add({item}).then(res => {
      if (res.data.code === 200) {

      }
    })
  }

  useEffect(() => {
    let { id } = props.match.params
    Api.getDetail(`?id=${id}`).then(res => {
      if (res.data.code === 200) {
        setDetail(res.data.data)
      }
    })

    Api.getBookList().then(res => {
      if (res.data.code === 200) {
        //props.setState('bookList', res.data.data)
      }
    })
  }, [])

  let { bookList } = props

  return (
    <div>
      <img src={detail.avatar} alt={detail.title}></img>,价格：{detail.price}元
      {
          bookList.find(book => book.id === detail.id)
          ? <button>已收藏</button>
          : <button onClick={handleAdd.bind(this, detail)}>收藏</button>
        }
    </div>
  )
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

export default connect(mapStateToProps, mapDispatchToProps)(Detail)