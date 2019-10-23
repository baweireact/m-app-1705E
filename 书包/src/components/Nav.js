import React, { Component } from 'react'
import { connect } from 'react-redux'
import Api from '../api'

class Nav extends Component {
  handleNav(index, id) {
    this.props.setState('currentIndex', index)
    this.props.setState('currentId', id)

    Api.getList(`?id=${id}`).then(res => {
      if (res.data.code === 200) {
        this.props.setState('currentList', res.data.data)
      }
    })
  }

  componentDidMount() {
    Api.getNav().then(res => {
      if (res.data.code === 200) {
        this.props.setState('navList', res.data.data)
      }
    })
  }
  render() {
    let { navList, currentIndex } = this.props

    let navListDom = navList.map((item, index) => (
      <span key={item.id} className={"m-nav-item " + (currentIndex === index ? 'active' : '')} 
        onClick={this.handleNav.bind(this, index, item.id)}>
        {item.title}
      </span>))

    return (
      <div>
        {navListDom}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    navList: state.navList,
    currentIndex: state.currentIndex
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setState(key, value) {
      dispatch({ type: 'SET_STATE', key, value })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)