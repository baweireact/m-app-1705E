import React, { Component } from 'react'
import Nav from '../components/Nav'
import BookList from '../components/BookList'

class Home extends Component {
  render() {
    return (
      <div>
        <Nav></Nav>
        <BookList></BookList>
      </div>
    )
  }
}
export default Home
