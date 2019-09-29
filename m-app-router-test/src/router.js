import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'
import Index from './views/Index'
import Home from './views/Home'
import MyBook from './views/MyBook'
import Detail from './views/Detail'


Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login'},
    { path: '/login', component: Login },
    { 
      path: '/index', 
      component: Index,
      children: [{
        path: '/index/home',
        component: Home
      }, {
        path: '/index/my_book',
        component: MyBook,
        meta: {
          needLogin: true
        }
      }, {
        path: '/index/home/detail/:id',
        component: Detail,
        meta: {
          needLogin: true
        }
      }]
    }
  ]
})

router.beforeEach((to, form, next) => {
  if (to.meta.needLogin) {
    if (localStorage.getItem('username')) {
      next()
    } else {
      next({path: '/login'})
    }
  } else {
    next()
  }
})

export default router
