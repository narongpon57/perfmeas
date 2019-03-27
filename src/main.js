import Vue from 'vue'
import VueRouter from 'vue-router'
import vSelect from 'vue-select'
import Datatable from 'vue2-datatable-component'
import { ClientTable } from 'vue-tables-2'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faTimes, faPlusCircle, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import App from './App.vue'
import { routes } from './routes'
import store from './store/store'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import VTooltip from 'v-tooltip'

Vue.use(VTooltip)

// const $ = window.$

axios.defaults.baseURL = 'http://localhost:3000/api'

Vue.use(VueRouter)
Vue.use(Datatable)
Vue.use(ClientTable)

library.add(faPlus, faTimes, faPlusCircle, faUser, faSignOutAlt)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.component('v-select', vSelect)
Vue.directive('tooltip', function (el, binding) {
  // $(el).tooltip({
  //   title: binding.value,
  //   placement: binding.arg,
  //   trigger: 'hover'
  // })
})

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (localStorage.getItem('token') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    }
    next()
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
