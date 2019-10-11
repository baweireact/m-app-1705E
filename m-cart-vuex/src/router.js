import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import MyCart from './views/MyCart'
import Me from './views/Me'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    }, {
      path: '/home',
      component: Home
    }, {
      path: '/my_cart',
      component: MyCart
    }, {
      path: '/me',
      component: Me
    }
  ]
})
