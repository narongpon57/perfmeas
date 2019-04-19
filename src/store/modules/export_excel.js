import axios from 'axios'
import { getField, updateField } from 'vuex-map-fields'

const initialState = () => {
  return {
    worklist: []
  }
}

const state = initialState()

const mutations = {
  updateField
}

const actions = {
  exportRiskAssessment ({ commit }, payload) {
    console.log(payload)
    return new Promise((resolve, reject) => {
      axios.get('/risk_assessment_export', { params: payload })
        .then(res => {
          resolve(res.data.result)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  },
  exportPrioritization ({ commit }, payload) {
    console.log(payload)
    return new Promise((resolve, reject) => {
      axios.get('/prioritization_export', { params: payload })
        .then(res => {
          resolve(res.data.result)
        })
        .catch(err => {
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
