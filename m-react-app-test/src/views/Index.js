import React, { Component, Suspense, lazy } from 'react'
import { Route, Switch, NavLink, Redirect } from 'react-router-dom'
import Home from './Home'
//import MyBook from './MyBook'
import Detail from './Detail'
const MyBook = lazy(() => import('./MyBook'))

export default class Index extends Component {
  render() {
    return (
      <div>
        <div>
          <NavLink to="/index/home" className="m-nav-item">首页</NavLink>
          <NavLink to="/index/book" className="m-nav-item">书包</NavLink>
        </div>
        <Suspense fallback={<div>loading...</div>}>
          <Switch>
            <Route exact path="/index/home" component={Home}></Route>
            <Route path="/index/book" render={() => {
              if (localStorage.getItem('username')) {
                return <MyBook></MyBook>
              } else {
                return <Redirect to="/login"></Redirect>
              }
            }}></Route>
            <Route path="/index/home/detail/:id" component={Detail}></Route>
          </Switch>
        </Suspense>
      </div>
    )
  }
}
