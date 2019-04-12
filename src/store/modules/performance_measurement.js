import axios from 'axios'
import { getField, updateField } from 'vuex-map-fields'

const initialState = () => {
  return {
    performanceMeasurement: [],
    performanceIndicators: []
  }
}

const state = initialState()

const mutations = {
  updateField,
  'RESET_STATE' (state) {
    Object.assign(state, initialState())
  },
  'SET_PREFORMANCE_ID' (state, payload) {
    state.performanceMeasurement[payload.index].perf_id = payload.performance.id
  },
  'SET_PERFORMANCE_MEASUREMENT' (state, performanceMeasurement) {
    state.performanceMeasurement = performanceMeasurement
  },
  'SET_SUMMARY_RESULT' (state, result) {
    state.performanceMeasurement[result.index].summary_result = result.ytd
  },
  'SET_PERFORMANCE_INDICATOR' (state, performanceIndicator) {
    state.performanceIndicators = performanceIndicator
  },
  'ADD_PERFORMANCE_MEASUREMENT' (state, indicators) {
    for (let i of indicators) {
      state.performanceMeasurement.push({
        perf_id: null,
        risk_assessment_indicator_id: i.risk_assessment_indicator_id,
        jan_multiplier_value: null,
        feb_multiplier_value: null,
        mar_multiplier_value: null,
        apr_multiplier_value: null,
        may_multiplier_value: null,
        jun_multiplier_value: null,
        jul_multiplier_value: null,
        aug_multiplier_value: null,
        sep_multiplier_value: null,
        oct_multiplier_value: null,
        nov_multiplier_value: null,
        dec_multiplier_value: null,
        jan_divisor_value: null,
        feb_divisor_value: null,
        mar_divisor_value: null,
        apr_divisor_value: null,
        may_divisor_value: null,
        jun_divisor_value: null,
        jul_divisor_value: null,
        aug_divisor_value: null,
        sep_divisor_value: null,
        oct_divisor_value: null,
        nov_divisor_value: null,
        dec_divisor_value: null,
        summary_result: null,
        code: i.code,
        name: i.name,
        multiplier: i.multiplier,
        divisor: i.divisor,
        formular: i.formular,
        operator: i.operator,
        target: i.target,
        unit: i.unit
      })
    }
  },
  'REMOVE_PERFORMANCE_MEASUREMENT' (state, index) {
    state.performanceMeasurement.splice(index, 1)
  }
}

const actions = {
  searchPerformanceMeasurement ({ commit }, payload) {
    const search = {
      org_id: payload.org.id,
      year: payload.year
    }
    return new Promise((resolve, reject) => {
      axios.get('/performance_measurement', { params: search })
        .then(res => res.data.result)
        .then(performanceMeasurement => {
          commit('SET_PERFORMANCE_MEASUREMENT', performanceMeasurement)
          resolve()
        })
        .catch(err => {
          console.log(err)
        })
    })
  },
  searchPerformanceIndicator ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.get('/performance_indicator', { params: payload })
        .then(res => res.data.result)
        .then(performanceIndicator => {
          const indicatorFilter = performanceIndicator.filter(obj => {
            return !payload.riskIndicatorId.includes(obj.risk_assessment_indicator_id)
          })
          commit('SET_PERFORMANCE_INDICATOR', indicatorFilter)
          resolve()
        })
        .catch(err => {
          console.log(err)
        })
    })
  },
  savePerformanceMeasurement ({ commit }, payload) {
    for (let [i, performance] of Object.entries(payload)) {
      axios.post('/performance_measurement', performance)
        .then(res => res.data.result)
        .then(performanceMeasurement => {
          commit('SET_PREFORMANCE_ID', {
            index: i,
            performance: performanceMeasurement
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}

const getters = {
  getField
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
