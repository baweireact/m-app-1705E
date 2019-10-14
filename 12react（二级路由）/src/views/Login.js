import React, { Component } from 'react'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  handleInput(field, e) {
    this.setState({
      [field]: e.target.value
    })
  }

  handleLogin() {
    let { username, password } = this.state
    if (username === 'admin') {
      this.props.history.push('/index/home')
    } else {
      alert('登录失败')
    }
  }
  render() {
    let { username, password } = this.state
    return (
      <div>
        <div>
          <input value={username} placeholder="请输入用户名" onChange={this.handleInput.bind(this, 'username')} />
        </div>
        <div>
          <input value={password} placeholder="请输入密码" type="password" onChange={this.handleInput.bind(this, 'password')}></input>
        </div>
        <button onClick={this.handleLogin.bind(this)}>登录</button>
      </div>
    )
  }
}
