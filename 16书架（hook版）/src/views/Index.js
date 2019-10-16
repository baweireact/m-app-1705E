import React, { Component, Suspense, lazy } from 'react'
import { Switch, Route, NavLink, Redirect } from 'react-router-dom'
import Detail from './Detail'
import Loading from '../components/Loading'
const MyBook = lazy(() => import('./MyBook'))
const Home = lazy(() => import('./Home'))

const Index = () => {
  return (
    <div>
      <div>
        <NavLink to="/index/home" className="m-nav-item">首页</NavLink>
        <NavLink to="/index/my_book" className="m-nav-item">书架</NavLink>
      </div>
      <Suspense fallback={<Loading></Loading>}>
        <Switch>
          <Route exact path="/index/home" component={Home}></Route>
          <Route path="/index/my_book" render={() => {
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

export default Index