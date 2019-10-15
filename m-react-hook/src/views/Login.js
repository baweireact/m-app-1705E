import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

const Login = (props) => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const usernameRef = useRef()

  const handleLogin = () => {
    axios({
      url: '/api/login',
      data: {
        username,
        password
      },
      method: 'post'
    }).then(res => {
      if (res.data.code === 200) {
        props.history.push('/index')
      } else {
        alert(res.data.message)
      }
    })
  }

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      handleLogin()
    }
  }

  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  return (
    <div>
      <div>
        <input placeholder="请输入用户名" value={username} onChange={ e => setUsername(e.target.value) } ref={usernameRef}></input>
      </div>
      <div>
        <input placeholder="请输入用户名" value={password} onChange={ e => setPassword(e.target.value) } type="password" onKeyUp={ handleEnter }></input>
      </div>
      <button onClick={handleLogin}>登录</button>
    </div>
  )
}

export default Login