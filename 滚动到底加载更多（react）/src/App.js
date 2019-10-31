import React, { Component } from 'react'
import axios from 'axios'

let updateDone = true
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      end: '',
      page: 1
    }
  }
  handleScroll(e) {
    let { list, end, page} = this.state
    if (
      e.target.clientHeight + e.target.scrollTop + 200 >
        e.target.scrollHeight &&
      end === "" && updateDone
    ) {
      updateDone = false
      page = page + 1;
      axios({
        url: `/api/mock_data?page=${page}&size=20`
      }).then(res => {
        if (res.data.code === 200) {
          this.setState({
            list: list.concat(res.data.data),
            page
          })
          if (res.data.data.length < 20) {
            console.log("到底了");
            this.setState({
              end: "到底了"
            })
          }
        }
      });
    }
  }
  componentDidUpdate() {
    updateDone = true
  }
  componentDidMount() {
    axios({
      url: '/api/mock_data?page=1&size=20'
    }).then(res => {
      if (res.data.code === 200) {
        this.setState({
          list: res.data.data
        })
      }
    })
  }
  render() {
    let { list, end } = this.state
    let listDom = list.map(item => (
      <div key={item.id} className="m-list-item">{item.name}</div>
    ))

    return (
      <div className="m-warp" onScroll={this.handleScroll.bind(this)}>
        {listDom}
        <div className="m-end">{end}</div>
      </div>
    )
  }
}
