import axios from 'axios'
import { getField, updateField } from 'vuex-map-fields'

const initialState = () => {
  return {
    risks: [],
    risk: []
  }
}

const state = initialState()

const mutations = {
  updateField,
  'ADD_RISK' (state, risk) {
    state.risks.push(risk)
  },
  'SET_RISKS' (state, risks) {
    state.risks = risks
  },
  'SET_RISK' (state, risk) {
    state.risk = risk
  },
  'RESET_STATE' (state) {
    Object.assign(state, initialState())
  }
}

const actions = {
  resetState ({ commit }) {
    commit('RESET_STATE')
  },

  saveRisk ({ commit }, risk) {
    axios.post('/risk', risk)
      .then(res => {
        commit('RESET_STATE')
      })
      .catch(err => console.log(err))
  },
  searchRisk ({ commit }, riskCondition) {
    axios.get('/risk', { params: riskCondition })
      .then(res => res.data.result)
      .then(risks => {
        commit('SET_RISKS', risks)
      })
      .catch(err => console.log(err))
  },
  getRisks ({ commit }) {
    axios.get('/risks')
      .then(res => res.data.result)
      .then(risks => {
        commit('SET_RISKS', risks)
      })
      .catch(err => console.log(err))
  },

  getRiskById ({ commit }, riskId) {
    axios.get(`/risk/${riskId}`)
      .then(res => res.data.data)
      .then(risk => {
        commit('SET_RISK', risk)
      })
      .catch(err => console.log(err))
  },

  updateRisk ({ commit }, risk) {
    axios.put('/risk', risk)
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
