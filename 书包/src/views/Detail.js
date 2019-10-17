import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

const Detail = (props) => {
  const [ detail, setDetail ] = useState({})

  const handleAdd = (item) => {
    let { bookList } = props
    let bookListClone = JSON.parse(JSON.stringify(bookList))
    bookListClone.push(item)
    props.setState('bookList', bookListClone)
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

  useEffect(() => {
    let { id } = props.match.params
    axios({
      url: `/api/detail?id=${id}`
    }).then(res => {
      if (res.data.code === 200) {
        setDetail(res.data.data)
      }
    })

    axios({
      url: '/api/get_book_list'
    }).then(res => {
      if (res.data.code === 200) {
        props.setState('bookList', res.data.data)
      }
    })
  }, [])

  let { bookList } = props

  return (
    <div>
      <img src={detail.avatar}></img>
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