import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from './views/Login'
import Index from './views/Index'

export default class Router extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Redirect from="/" to="/login" exact></Redirect>
          <Route path="/login" component={Login}></Route>
          <Route path="/index" component={Index}></Route>
        </Switch>
      </div>
    )
  }
}
