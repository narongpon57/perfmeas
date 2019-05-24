import axios from 'axios'
import { getField, updateField } from 'vuex-map-fields'

const initialState = () => {
  return {
    periods: [],
    period: [],
    onPeriod: true
  }
}

const state = initialState()

const mutations = {
  updateField,
  'ADD_PERIOD' (state, periods) {
    state.periods.push(periods)
  },
  'SET_PERIODS' (state, periods) {
    state.periods = periods
  },
  'SET_ON_PERIOD' (state, onPeriod) {
    state.onPeriod = onPeriod
  },
  'SET_PERIOD' (state, period) {
    state.period = period
  },
  'RESET_PERIOD' (state) {
    state.period = []
  },
  'RESET_STATE' (state) {
    Object.assign(state, initialState())
  }
}

const actions = {
  resetState ({ commit }) {
    commit('RESET_STATE')
  },
  savePeriod ({ commit }, periods) {
    return new Promise((resolve, reject) => {
      axios.post('/period', periods)
        .then(res => {
          // commit('RESET_STATE')
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  searchPeriod ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.get('/period', { params: { ...payload.period } })
        .then(res => res.data.result)
        .then(periods => {
          commit('SET_PERIODS', periods)
          resolve()
        })
        .catch(err => console.log(err))
    })
  },
  getPeriods ({ commit }) {
    axios.get('/periods')
      .then(res => res.data.result)
      .then(periods => {
        commit('SET_PERIODS', periods)
      })
      .catch(err => console.log(err))
  },
  getPeriodById ({ commit }, riskId) {
    axios.get(`/period/${riskId}`)
      .then(res => res.data.data)
      .then(period => {
        commit('SET_PERIOD', period)
      })
      .catch(err => console.log(err))
  },
  updatePeriod ({ commit }, periods) {
    return new Promise((resolve, reject) => {
      axios.put('/period', periods)
        .then(res => {
          resolve()
          // commit('RESET_STATE')
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  getPeriodCompare ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.get('/on_period', { params: payload })
        .then(res => res.data.result)
        .then(period => {
          commit('SET_ON_PERIOD', period.length)
          resolve()
        })
        .catch(err => console.log(err))
    })
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
