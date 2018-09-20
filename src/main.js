import Vue from 'vue'
import VueRouter from 'vue-router'
import vSelect from 'vue-select'

import App from './App.vue'
import { routes } from './routes'
import store from './store/store'

const $ = window.$

Vue.use(VueRouter)

Vue.component('v-select', vSelect)
Vue.directive('tooltip', function (el, binding) {
  $(el).tooltip({
    title: binding.value,
    placement: binding.arg,
    trigger: 'hover'
  })
})

Vue.config.productionTip = false

const router = new VueRouter({
  mard: 'history',
  routes
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
