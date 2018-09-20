import Vue from 'vue'
import Vuex from 'vuex'
import header from './modules/header'
import prioritizationCriteria from './modules/prioritization_criteria'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    header,
    prioritizationCriteria
  }
})
