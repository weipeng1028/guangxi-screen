import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
// import store from './store/index'
import ElementUI from 'element-ui'
import { debounce, throttle } from 'lodash'
import VideoPlayer from 'vue-video-player'
import api from './api/api'
import axios from './libs/axios'
import vueSwiper from 'vue-awesome-swiper'
import './assets/css/reset.css'
import './assets/css/public.css'
import './assets/css/change-ele.css'
import './assets/iconfont/iconfont.css'

// 引入nprogress
Vue.use(vueSwiper)
Vue.use(VideoPlayer)
Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$http = axios
Vue.prototype.$debounce = debounce
Vue.prototype.$throttle = throttle
// Vue.prototype.$isPermission = isPermission
// Vue.prototype.$_getMonth = getMonth
Vue.use(ElementUI)
// Vue.use(directives)
// Vue.use(components)
new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
