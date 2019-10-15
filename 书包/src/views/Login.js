import React, { Component } from 'react'
import axios from 'axios'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }

    this.usernameRef = React.createRef()
  }

  handleInput(field, e) {
    this.setState({
      [field]: e.target.value
    })
  }

  handleLogin() {
    let { username, password } = this.state
    console.log(username, password)
    if (username.trim() === '') {
      alert('用户名不能为空')
    } else {
      axios({
        url: '/api/login',
        data: {
          username,
          password
        },
        method: 'post'
      }).then(res => {
        if (res.data.code === 200) {
          localStorage.setItem('username', res.data.data.username)
          this.props.history.push('/index')
        } else {
          alert(res.data.message)
        }
      })
    }
  }

  handleEnter(e) {
    if (e.keyCode === 13) {
      this.handleLogin()
    }
  }

  componentDidMount() {
    //document.getElementById('m-username').focus()
    this.usernameRef.current.focus()
  }

  render() {
    let { username, password } = this.state
    return (
      <div>
        <div>
          <input value={username} ref={this.usernameRef} onChange={this.handleInput.bind(this, 'username')} placeholder="请输入用户名"></input>
        </div>
        <div>
          <input value={password} onKeyUp={this.handleEnter.bind(this)} onChange={this.handleInput.bind(this, 'password')} type="password" placeholder="请输入密码"></input>
        </div>
        <button onClick={this.handleLogin.bind(this)}>登录</button>
      </div>
    )
  }
}
