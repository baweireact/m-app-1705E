import React, { Component } from 'react'
import { Route, Switch, NavLink } from 'react-router-dom'
import Home from './Home'
import MyBook from './MyBook'

export default class Index extends Component {
  render() {
    return (
      <div>
        <div>
          <NavLink to="/index/home" className="m-nav-item">首页</NavLink>
          <NavLink to="/index/book" className="m-nav-item">书包</NavLink>
        </div>
        <Switch>
          <Route path="/index/home" component={Home}></Route>
          <Route path="/index/book" component={MyBook}></Route>
        </Switch>
      </div>
    )
  }
}
