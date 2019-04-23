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
  'SET_INDICATOR' (state, indicator) {
    state.indicator = indicator
  },
  'SET_FORMULAR' (state, formular) {
    state.indicator.formular = formular
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
    axios.post('/indicator', indicators)
      .then(res => {
        commit('RESET_STATE')
      })
      .catch(err => console.log(err))
  },
  searchIndicator ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.get('/indicator', { params: { ...payload.indicator } })
        .then(res => res.data.result)
        .then(indicators => {
          let indicatorFilter = indicators
          if (payload.indicatorIds !== null) {
            indicatorFilter = indicators.filter(obj => {
              return !payload.indicatorIds.includes(obj.id)
            })
          }
          commit('SET_INDICATORS', indicatorFilter)
          resolve()
        })
        .catch(err => console.log(err))
    })
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
    axios.get(`/indicator/${riskId}`)
      .then(res => res.data.data)
      .then(indicator => {
        commit('SET_INDICATOR', indicator)
      })
      .catch(err => console.log(err))
  },

  updateIndicator ({ commit }, indicators) {
    axios.put('/indicator', indicators)
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
