import React, { Component } from 'react'

export default class Nav extends Component {
  render() {
    let { navList, currentIndex } = this.props
    let navListDom = navList.map((item, index) => (
      <span 
        key={item.id} 
        className={"m-nav-item " + (currentIndex === index ? 'active' : '')} 
        onClick={this.props.onNav.bind(this, index, item.id)}>
        {item.title}
      </span>
    ))
    return (
      <div>
        {navListDom}
      </div>
    )
  }
}
