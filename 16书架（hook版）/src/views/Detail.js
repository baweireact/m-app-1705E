import React, { useState, useEffect } from 'react'
import axios from 'axios'
import LazyLoad from 'react-lazy-load'

const Detail = (props) => {
  const [detail, setDetail] = useState({})

  const handleAdd = () => {
    axios({
      url: '/api/add_book',
      data: {
        item: detail
      },
      method: 'post'
    }).then(res => {
      if (res.data.code === 200) {
        let { id } = props.match.params
        axios({
          url: `/api/detail?id=${id}`
        }).then(res => {
          if (res.data.code === 200) {
            setDetail(res.data.data)
          }
        })
      }
    })
  }

  useEffect(() => {
    let { id } = props.match.params
    axios({
      url: `/api/detail?id=${id}`
    }).then(res => {
      if (res.data.code === 200) {
        setDetail(res.data.data)
      }
    })
  }, [])

  return (
    <div>
      <LazyLoad height={300} onContentVisible={() => console.log('look ma I have been lazyloaded!')}>
        <img src={detail.avatar} ></img>
      </LazyLoad>
      <button className={'m-add-btn ' + (detail.is_in_my_book ? "" : 'active')} onClick={handleAdd.bind(this)}>收藏</button>
    </div>
  )
}

export default Detail
