import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'
import loadingImg from './images/loading.gif'

Vue.config.productionTip = false

// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: loadingImg,
  loading: loadingImg,
  attempt: 1
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
