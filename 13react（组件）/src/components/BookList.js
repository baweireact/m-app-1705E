import React, { Component } from 'react'

export default class BookList extends Component {
  render() {
    let { currentList } = this.props

    let listDom = currentList.map(item => (
      <div key={item.id}>
        {item.title}
      </div>
    ))

    return (
      <div>
        {listDom}
      </div>
    )
  }
}
