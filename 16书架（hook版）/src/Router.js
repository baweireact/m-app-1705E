import React, {} from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from './views/Login'
import Index from './views/Index'

const Router = () => {
  return (
    <Switch>
      <Redirect from="/" to="/login" exact></Redirect>
      <Route path="/login" component={Login}></Route>
      <Route path="/index" component={Index}></Route>
    </Switch>
   )
}

export default Router