import Vue from 'vue'
import Vuex from 'vuex'
import header from './modules/header'
import prioritization from './modules/prioritization'
import riskAssessment from './modules/risk_assessment'
import riskMaster from './modules/risk_master'
import indicatorMaster from './modules/indicator_master'
import organization from './modules/organization'
import authentication from './modules/authentication'
import worklist from './modules/worklist'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    header,
    prioritization,
    riskAssessment,
    riskMaster,
    indicatorMaster,
    organization,
    authentication,
    worklist
  },
  actions: {
    resetAllState ({ commit }) {
      commit('prioritization/RESET_STATE')
      commit('riskAssessment/RESET_STATE')
      commit('riskMaster/RESET_STATE')
      commit('indicatorMaster/RESET_STATE')
      commit('organization/RESET_STATE')
      commit('authentication/RESET_STATE')
      commit('worklist/RESET_STATE')
    }
  }
})
