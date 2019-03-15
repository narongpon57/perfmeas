import Vue from 'vue'
import Vuex from 'vuex'
import header from './modules/header'
import prioritization from './modules/prioritization'
import riskAssessment from './modules/risk_assessment'
import riskMaster from './modules/risk_master'
import indicatorMaster from './modules/indicator_master'
import organization from './modules/organization'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    header,
    prioritization,
    riskAssessment,
    riskMaster,
    indicatorMaster,
    organization
  }
})
