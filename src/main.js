import Vue from 'vue'
import VueRouter from 'vue-router'
import vSelect from 'vue-select'

import App from './App.vue'
import { routes } from './routes'

Vue.use(VueRouter)

Vue.component('v-select', vSelect)

Vue.config.productionTip = false

const router = new VueRouter({
  mard: 'history',
  routes
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
