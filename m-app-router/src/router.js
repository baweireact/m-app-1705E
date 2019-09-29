import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'
import Index from './views/Index'
import Home from './views/Home'
import MyBook from './views/MyBook'
import Detail from './views/Detail'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/login'},
    { path: '/login', component: Login },
    { 
      path: '/index', 
      component: Index,
      children: [{
        path: '/index/home',
        component: Home,
      }, {
        path: '/index/my_book',
        component: MyBook
      }, {
        path: '/index/home/detail/:id',
        component: Detail
      }]
    }
  ]
})
