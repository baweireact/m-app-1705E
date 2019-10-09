import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'
import Index from './views/Index'
import Home from './views/Home'
import MyBook from './views/MyBook'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/index',
      redirect: '/index/home'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/index',
      component: Index,
      children: [{
        path: '/index/home',
        component: Home
      }, {
        path: '/index/my_book',
        component: MyBook
      }]
    }
  ]
})
