import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

const Nav = (props) => {

  const handleNav = (index, id) => {
    props.onSetState('currentIndex', index)
    props.onSetState('currentId', id)
    axios({
      url: `/api/get_list?id=${id}`
    }).then(res => {
      if (res.data.code === 200) {
        props.onSetState('contentList', res.data.data)
      }
    })
  }

  useEffect(() => {
    axios({
      url: '/api/get_nav'
    }).then(res => {
      if (res.data.code === 200) {
        props.onSetState('navList', res.data.data)
      }
    })

    axios({
      url: `/api/get_list?id=0`
    }).then(res => {
      if (res.data.code === 200) {
        props.onSetState('contentList', res.data.data)
      }
    })
  }, [])

  let { navList, currentIndex } = props
  let navListDom = navList.map((item, index) => (
    <span 
      key={item.id} 
      className={"m-nav-item " + (currentIndex === index ? 'active' : '')} 
      onClick={handleNav.bind(this, index, item.id)}>
      {item.title}
    </span>
  ))

  return (
    <div>
      {navListDom}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    navList: state.navList,
    currentIndex: state.currentIndex
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSetState(key, value) {
      dispatch({ type: 'SET_STATE', key, value })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)