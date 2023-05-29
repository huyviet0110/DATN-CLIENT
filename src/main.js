import Vue from 'vue'

import App from './App.vue'
import router from './router'

import './assets/css/main.css'
import './assets/scss/main.scss'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'
import { ValidationProvider } from 'vee-validate/dist/vee-validate.full.esm'
import { ValidationObserver } from 'vee-validate'
import VueCarousel from 'vue-carousel'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/vi'
import LocationRepository from '@/repositories/LocationRepository'
import TripRepository from '@/repositories/TripRepository'
import JourneyRepository from '@/repositories/JourneyRepository'
import UserRepository from '@/repositories/UserRepository'
import OrderRepository from '@/repositories/OrderRepository'
import AdminRepository from '@/repositories/AdminRepository'
import '@/middlewares'
import store from '@/store'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueToast)
Vue.use(VueCarousel)
Vue.use(ElementUI, { locale })

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

Vue.prototype.$locationRepository = new LocationRepository(import.meta.env.VITE_API_BASE_URL)
Vue.prototype.$tripRepository = new TripRepository(import.meta.env.VITE_API_BASE_URL)
Vue.prototype.$journeyRepository = new JourneyRepository(import.meta.env.VITE_API_BASE_URL)
Vue.prototype.$userRepository = new UserRepository(import.meta.env.VITE_API_BASE_URL)
Vue.prototype.$orderRepository = new OrderRepository(import.meta.env.VITE_API_BASE_URL)
Vue.prototype.$adminRepository = new AdminRepository(import.meta.env.VITE_API_BASE_URL)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
