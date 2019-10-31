import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Index from '../views/Index'
import Home from '../views/Home'
import MyBook from '../views/MyBook'
import Detail from '../views/Detail'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
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
    }, {
      path: '/detail/:id',
      component: Detail
    }]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
