import React, { Component } from 'react'
import axios from 'axios'

export default class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      detail: {}
    }
  }

  componentDidMount() {
    let { id } = this.props.match.params
    axios({
      url: `/api/detail?id=${id}`
    }).then(res => {
      if (res.data.code === 200) {
        this.setState({
          detail: res.data.data
        })
      }
    })
  }

  render() {
    let { detail } = this.state
    return (
      <div>
        <img src={detail.avatar}></img>
      </div>
    )
  }
}
