import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

const MyBook = (props) => {
  const [selected, setSelected] = useState([])
  const [selectAll, setSelectAll] = useState(false)


  const handleSelected = (id, e) => {
    let { myBook } = props
    let selectedClone = JSON.parse(JSON.stringify(selected))
    let index = selectedClone.findIndex(item => item === id)
    if (e.target.checked) {
      selectedClone.push(id)
    } else {
      selectedClone.splice(index, 1)
    }
    setSelected(selectedClone)
    setSelectAll(selectedClone.length === myBook.length)
  }

  const handleDelete = (ids) => {
    axios({
      url: '/api/delete_book',
      data: {
        ids
      },
      method: 'post'
    }).then(res => {
      if (res.data.code === 200) {
        props.onSetState('myBook', res.data.data)
      }
    })
  }

  const handleDeleteMore = () => {
    axios({
      url: '/api/delete_book',
      data: {
        ids: selected
      },
      method: 'post'
    }).then(res => {
      if (res.data.code === 200) {
        props.onSetState('myBook', res.data.data)
      }
    })
  }

  const handleSelectAll = (e) => {
    let { myBook } = props
    setSelectAll(e.target.checked)
    if (e.target.checked) {
      let selected = myBook.map(item => item.id)
      setSelected(selected)
    } else {
      setSelected([])
    }
  }

  useEffect(() => {
    axios({
      url: '/api/get_my_book'
    }).then(res => {
      if (res.data.code === 200) {
        props.onSetState('myBook', res.data.data)
      }
    })
  }, [])

  useEffect(() => {
    console.log(selected)
  })


  let { myBook } = props

  let myBookDom = myBook.map(item => (
    <div key={item.id}>
      <input type="checkbox" checked={selected.findIndex(id => id === item.id) >= 0 ? true : false} onChange={handleSelected.bind(this, item.id)} />
      {item.title}
      <button onClick={handleDelete.bind(this, [item.id])}>删除</button>
    </div>
  ))

  return (
    <div>
      <input type="checkbox" checked={selectAll} onChange={handleSelectAll.bind(this)}></input>全选
        <button onClick={handleDeleteMore.bind(this)}>删除</button>
      {myBookDom}
    </div>
  )
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
