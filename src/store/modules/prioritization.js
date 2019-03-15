import axios from 'axios'
import { getField, updateField } from 'vuex-map-fields'

const intitialState = () => {
  return {
    criteria: [],
    count: 0
  }
}

const state = intitialState()

const mutations = {
  updateField,
  'SET_CRITERIA' (state, criteria) {
    state.criteria = criteria
    state.count = criteria.length
  }
}

const actions = {
  getCriteria ({ commit }) {
    axios.get('/criteria')
      .then(res => res.data.result)
      .then(criteria => {
        commit('SET_CRITERIA', criteria)
      })
      .catch(err => console.log(err))
  }
}

const getters = {
  getField,
  getPrioritizationCriteria (state) {
    return state.prioritization_criteria
  },
  countPrioritizationCriteria () {
    return state.prioritization_criteria.length
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
