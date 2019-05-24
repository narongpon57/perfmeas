import axios from 'axios'
import { getField, updateField } from 'vuex-map-fields'

const initialState = () => {
  return {
    scoreSummary: [],
    ouRiskAssessment: [],
    ouPrioritization: [],
    ouPerfmeas: [],
    ouNotInProcess: []
  }
}

const state = initialState()

const mutations = {
  updateField,
  'RESET_STATE' (state) {
    Object.assign(state, initialState())
  },
  'SET_TOP_SCORE_SUMMARY' (state, summary) {
    state.scoreSummary = summary
  },
  'SET_WORKING_PROCESS' (state, data) {
    state.ouRiskAssessment = data.riskAssessment
    state.ouPrioritization = data.prioritization
    state.ouPerfmeas = data.perfmeas
    state.ouNotInProcess = data.notInProcess
  }
}

const actions = {
  getTop5Score ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.get('/prioritization_topscore', { params: payload })
        .then(res => res.data.result)
        .then(summary => {
          commit('SET_TOP_SCORE_SUMMARY', summary)
          resolve()
        })
        .catch((err) => {
          console.log(err)
        })
    })
  },

  getWorkingProcess ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      Promise.all([
        axios.get('/get_ou_risk_assessment', {
          params: payload
        }),
        axios.get('/get_ou_prioritization', {
          params: payload
        }),
        axios.get('/get_ou_perfmeas', {
          params: payload
        }),
        axios.get('/get_ou_other', {
          params: payload
        })
      ])
        .then((result) => {
          commit('SET_WORKING_PROCESS', {
            riskAssessment: result[0].data.result,
            prioritization: result[1].data.result,
            perfmeas: result[2].data.result,
            notInProcess: result[3].data.result
          })
          resolve()
        })
        .catch((err) => {
          console.log(err)
          reject(err)
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
