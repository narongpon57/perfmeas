import axios from 'axios'
import { getField, updateField } from 'vuex-map-fields'

const initialState = () => {
  return {
    indicators: [],
    indicator: []
  }
}

const state = initialState()

const mutations = {
  updateField,
  'ADD_INDICATOR' (state, indicators) {
    state.indicators.push(indicators)
  },
  'SET_INDICATORS' (state, indicators) {
    state.indicators = indicators
  },
  'SET_INDICATOR' (state, indicators) {
    state.indicators = indicators
  },
  'RESET_STATE' (state) {
    Object.assign(state, initialState())
  }
}

const actions = {
  resetState ({ commit }) {
    commit('RESET_STATE')
  },

  saveIndicator ({ commit }, indicators) {
    axios.post('/indicators', indicators)
      .then(res => {
        commit('RESET_STATE')
      })
      .catch(err => console.log(err))
  },
  searchIndicator ({ commit }, indicatorCondition) {
    axios.get('/indicators', { params: indicatorCondition })
      .then(res => res.data.result)
      .then(indicators => {
        commit('SET_INDICATORS', indicators)
      })
      .catch(err => console.log(err))
  },
  getIndicators ({ commit }) {
    axios.get('/indicators')
      .then(res => res.data.result)
      .then(indicators => {
        commit('SET_INDICATORS', indicators)
      })
      .catch(err => console.log(err))
  },

  getIndicatorById ({ commit }, riskId) {
    axios.get(`/indicators/${riskId}`)
      .then(res => res.data.data)
      .then(indicators => {
        commit('SET_INDICATOR', indicators)
      })
      .catch(err => console.log(err))
  },

  updateIndicator ({ commit }, indicators) {
    axios.put('/indicators', indicators)
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
