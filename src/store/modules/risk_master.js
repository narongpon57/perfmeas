import axios from 'axios'
import { getField, updateField } from 'vuex-map-fields'

const initialState = () => {
  return {
    risks: [],
    risk: {
      is_active: 1,
      existing_risk: []
    }
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
  },
  'ADD_EXISTING_MEASURE' (state, payload) {
    for (let indicator of payload.indicators) {
      state.risk.existing_risk.push({
        id: null,
        indicator: indicator
      })
    }
  },
  'REMOVE_EXISTING_MEASURE' (state, index) {
    state.risk.existing_risk.splice(index, 1)
  }
}

const actions = {
  resetState ({ commit }) {
    commit('RESET_STATE')
  },

  saveRisk ({ commit }, risk) {
    return new Promise((resolve, reject) => {
      axios.post('/risk', risk)
        .then(res => {
          // commit('RESET_STATE')
          const notify = {
            type: 'success',
            text: 'Save Success'
          }
          resolve(notify)
        })
        .catch(() => {
          const notify = {
            type: 'error',
            text: 'Save Failed'
          }
          reject(notify)
        })
    })
  },
  searchRisk ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.get('/risk', { params: { ...payload.risk } })
        .then(res => res.data.result)
        .then(risks => {
          let risksFilter = risks
          if (payload.riskIds !== null) {
            risksFilter = risks.filter(obj => {
              return !payload.riskIds.includes(obj.id)
            })
          }
          commit('SET_RISKS', risksFilter)
          resolve()
        })
        .catch(err => console.log(err))
    })
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
      .then(res => res.data.result)
      .then(risk => {
        console.log(risk)
        commit('SET_RISK', risk)
      })
      .catch(err => console.log(err))
  },

  updateRisk ({ commit }, risk) {
    return new Promise((resolve, reject) => {
      axios.put('/risk', risk)
        .then(res => {
          const notify = {
            type: 'success',
            text: 'Update Success'
          }
          resolve(notify)
          // commit('RESET_STATE')
        })
        .catch(() => {
          const notify = {
            type: 'error',
            text: 'Update Failed'
          }
          reject(notify)
        })
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
