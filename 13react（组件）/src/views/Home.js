import React, { Component } from 'react'
import Nav from '../components/Nav'
import BookList from '../components/BookList'
import axios from 'axios'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navList: [],
      currentIndex: 0,
      currentList: []
    }
  }
  handleNav(index, id) {
    this.setState({
      currentIndex: index
    })
    axios({
      url: `/api/get_list?id=${id}`
    }).then(res => {
      if (res.data.code === 200) {
        this.setState({
          currentList: res.data.data
        })
      }
    })
  }
  componentDidMount() {
    axios({
      url: '/api/get_nav'
    }).then(res => {
      if (res.data.code === 200) {
        this.setState({
          navList: res.data.data
        })
      }
    })

    axios({
      url: `/api/get_list?id=0`
    }).then(res => {
      if (res.data.code === 200) {
        this.setState({
          currentList: res.data.data
        })
      }
    })
  }
  render() {
    let { navList, currentIndex, currentList } = this.state
    return (
      <div>
        <Nav navList={navList} currentIndex={currentIndex} onNav={this.handleNav.bind(this)}></Nav>
        <BookList currentList={currentList}></BookList>
      </div>
    )
  }
}
