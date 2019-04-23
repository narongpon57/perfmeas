import axios from 'axios'
import { getField, updateField } from 'vuex-map-fields'

const initialState = () => {
  return {
    periods: [],
    period: []
  }
}

const state = initialState()

const mutations = {
  updateField,
  'ADD_INDICATOR' (state, periods) {
    state.periods.push(periods)
  },
  'SET_INDICATORS' (state, periods) {
    state.periods = periods
  },
  'SET_INDICATOR' (state, period) {
    state.period = period
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
    axios.post('/period', periods)
      .then(res => {
        commit('RESET_STATE')
      })
      .catch(err => console.log(err))
  },
  searchPeriod ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.get('/period', { params: { ...payload.period } })
        .then(res => res.data.result)
        .then(periods => {
          commit('SET_INDICATORS', periods)
          resolve()
        })
        .catch(err => console.log(err))
    })
  },
  getPeriods ({ commit }) {
    axios.get('/periods')
      .then(res => res.data.result)
      .then(periods => {
        commit('SET_INDICATORS', periods)
      })
      .catch(err => console.log(err))
  },

  getPeriodById ({ commit }, riskId) {
    axios.get(`/period/${riskId}`)
      .then(res => res.data.data)
      .then(period => {
        commit('SET_INDICATOR', period)
      })
      .catch(err => console.log(err))
  },

  updatePeriod ({ commit }, periods) {
    axios.put('/period', periods)
      .then(res => {
        commit('RESET_STATE')
      })
      .catch(err => console.log(err))
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
