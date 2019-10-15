import React, { Component } from 'react'
import axios from 'axios'
import LazyLoad from 'react-lazy-load'

export default class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      detail: {}
    }
  }

  handleAdd() {
    let { detail } = this.state
    axios({
      url: '/api/add_book',
      data: {
        item: detail
      },
      method: 'post'
    }).then(res => {
      if (res.data.code === 200) {
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
    })
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
        <LazyLoad height={300} onContentVisible={() => console.log('look ma I have been lazyloaded!')}>
          <img src={detail.avatar} ></img>
        </LazyLoad>
        <button className={'m-add-btn ' + (detail.is_in_my_book ? "": 'active')} onClick={this.handleAdd.bind(this)}>收藏</button>
      </div>
    )
  }
}
