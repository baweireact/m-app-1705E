import Vue from 'vue'
import App from './App.vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueScroller from 'vue-scroller'

// require styles
import 'swiper/dist/css/swiper.css'
import './index.css'

Vue.use(VueAwesomeSwiper, /* { default global options } */)
Vue.use(VueScroller)

Vue.config.productionTip = false

new Vue({
  render: function (createElement) {
    return createElement(App)
  },
}).$mount('#app')
